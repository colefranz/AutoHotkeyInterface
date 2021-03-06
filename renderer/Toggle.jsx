import React from 'react';

class Toggle extends React.Component {
    toggleClassName() {
        const classNames = ['toggle'];
        if (this.props.active) classNames.push('active');
        return classNames.join(' ');
    }

    render() {
        return (
            <div className={this.toggleClassName()} onClick={this.props.toggle}>
                <label title={this.props.labelTitle}>{this.props.label}</label>
                <div className="toggle-slider">
                    <i className="toggle-ball"></i>
                </div>
            </div>
        );
    }
}

Toggle.defaultProps = {
    label: '',
    labelTitle: '',
    active: false,
    toggle: () => {}
};

export default  Toggle;
