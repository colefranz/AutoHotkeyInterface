import React from 'react';
import _ from 'lodash';
import ShortcutModel from './models/Shortcut.js';
import Modifier from './Modifier.jsx';
import Hotkey from './Hotkey.jsx';

class Shortcut extends React.Component {
    renderHotkeys() {
        // for each slider
        const configurables = this.props.shortcut.hotkeys.map((hotkey, i) => {
            return <Hotkey key={i} hotkey={hotkey} />;
        });

        return <div className="hotkeys">{configurables}</div>;
    }

    renderModifiers() {
        const {shortcut} = this.props;
        const shortcutKeys = _.map(this.props.shortcut.modifiers, (modifier, i) => {
            const handleModifierUpdate = (updatedModifier) => {
                shortcut.modifiers[i] = updatedModifier;
                this.props.updateModel(shortcut);
            };

            return (
                <Modifier
                    key={i}
                    updateModel={handleModifierUpdate}
                    modifier={modifier}
                />
            );
        });

        return (
            <div className="shortcutKeys">
                {shortcutKeys}
            </div>
        )
    }

    handleKeyInputChange = (event) => {
        const newKey = String.fromCharCode(event.which);
        const match = /^[0-9a-zA-Z]$/.exec(newKey);
        if (match) {
            const {shortcut} = this.props;
            shortcut.key = newKey.toLowerCase();
            this.props.updateModel(shortcut)
        }
    }

    // TODO style this ghetto input so that on focus the text looks highlighted or on focus
    // it displays something totally different
    renderShortcutKey() {
        return (
            <div className="shortcut-key-container">
                {this.renderModifiers()}
                <div
                    className="shortcut-key"
                    onKeyDown={this.handleKeyInputChange}
                    tabIndex="-1"
                >
                    {this.props.shortcut.key}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="shortcut">
                {this.renderShortcutKey()}
                {this.renderHotkeys()}
                <hr />
            </div>
        );
    }
}

Shortcut.defaultProps = {
    shortcut: new ShortcutModel(),
    updateModel: () => {}
}

export default Shortcut;
