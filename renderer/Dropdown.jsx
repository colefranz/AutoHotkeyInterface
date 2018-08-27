import React from 'react';

class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
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
            <div className={this.dropdownClassName()}>
                <div className="dropdown-control" onClick={this.toggleOpen}>
                    <span>
                        {this.props.value ? this.props.value.label : this.props.placeholder}
                    </span>
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
