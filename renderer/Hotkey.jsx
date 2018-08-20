import React from 'react';
import AbstractHotkey from './hotkeys/AbstractHotkey.js';

class Hotkey extends React.Component {
    renderName() {
        return <p className="hotkey-name">{this.props.hotkey.name}</p>
    }

    renderConfigurables() {
        // for each slider
        const configurables = this.props.hotkey.configurables.map((configurable) => {
            return <span>Slide me {configurable.value}</span>
        });

        return <div className="hotkey-configurables">{configurables}</div>;
    }

    render() {
        return (
            <div className="hotkey">
                {this.renderName()}
                {this.renderConfigurables()}
            </div>
        );
    }
}

Hotkey.defaultProps = {
    hotkey: new AbstractHotkey()
}

module.exports = Hotkey;
