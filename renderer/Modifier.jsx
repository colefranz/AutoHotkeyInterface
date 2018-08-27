import React from 'react';

class ShortcutKey extends React.Component {
    getClassName() {
        const classNames = ['modifier', 'selector'];

        if (this.props.modifier.active) classNames.push('active');

        return classNames.join(' ');
    }

    toggleActive = () => {
        const {modifier} = this.props;
        modifier.toggleActive();
        this.props.updateModel(modifier);
    }

    render() {
        if (!this.props.modifier) return null;

        return (
            <span className={this.getClassName()} onClick={this.toggleActive}>
                {this.props.modifier.name}
            </span>
        );
    }
}

ShortcutKey.defaultProps = {
    modifier: undefined,
    updateModel: () => {}
};

export default  ShortcutKey;
