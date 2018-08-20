import React from 'react';
import ShortcutModel from './models/Shortcut.js';
import Hotkey from './Hotkey.jsx';

class Shortcut extends React.Component {
    renderName() {
        return <p className="hotkey-name">{this.props.hotkey.name}</p>
    }

    renderHotkeys() {
        // for each slider
        const configurables = this.props.shortcut.hotkeys.map((hotkey, i) => {
            return <Hotkey key={i} hotkey={hotkey} />;
        });

        return <div className="hotkeys">{configurables}</div>;
    }

    render() {
        return (
            <div className="shortcut">
                {this.renderHotkeys()}
                <hr />
            </div>
        );
    }
}

Shortcut.defaultProps = {
    shortcut: new ShortcutModel()
}

module.exports = Shortcut;
