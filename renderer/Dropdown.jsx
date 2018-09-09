import React from 'react';
import DownIcon from '!svg-react-loader?name=DownIcon!./svg/down.svg';

class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.element = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick = (event) => {
        if (!this.element.current.contains(event.target)) {
            this.closeDropdown();
        }
    }

    closeDropdown() {
        this.setState({open: false});
    }

    toggleOpen = () => {
        const open = !this.state.open;
        this.setState({open});
    }

    dropdownClassName() {
        const classNames = ['dropdown'];
        if (this.state.open) classNames.push('active');
        return classNames.join(' ');
    }

    renderDropdownOptions() {
        const options = this.props.options.map((option) => {
            const onSelect = () => {
                this.props.onChange(option);
                this.setState({open: false});
            };
            const isSelected = this.props.value === option;
            let className = 'dropdown-option';
            if (isSelected) className += ' selected';

            return (
                <div
                    key={option.label}
                    onClick={onSelect}
                    className={className}
                >
                    {option.label}
                </div>
            );
        });

        return (
            <div className="dropdown-options">{options}</div>
        );
    }

    render() {
        return (
            <div className={this.dropdownClassName()} ref={this.element}>
                <div className="dropdown-control dropdown-option" onClick={this.toggleOpen}>
                    <span>
                        {this.props.value ? this.props.value.label : this.props.placeholder}
                    </span>
                    <DownIcon />
                </div>
                {this.renderDropdownOptions()}
            </div>
        );
    }
}

Dropdown.defaultProps = {
    options: [],
    placeholder: '',
    onChange: () => {},
    value: undefined
};

export default  Dropdown;
