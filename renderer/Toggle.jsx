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
                <label>{this.props.label}</label>
                <div className="toggle-slider">
                    <div className="active-side toggle-side">ON</div>
                    <div className="inactive-side toggle-side">OFF</div>
                    <i className="toggle-ball"></i>
                </div>
            </div>
        );
    }
}

Toggle.defaultProps = {
    label: '',
    active: false,
    toggle: () => {}
};

export default  Toggle;
