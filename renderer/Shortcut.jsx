import React from 'react';
import _ from 'lodash';
import ShortcutModel from './models/Shortcut.js';
import Modifier from './Modifier.jsx';
import HotkeyCreator from './HotkeyCreator.jsx';
import AbstractHotkey from './models/hotkeys/AbstractHotkey.js';

class Shortcut extends React.Component {
    handleKeyInputChange = (event) => {
        const newKey = String.fromCharCode(event.which);
        const match = /^[0-9a-zA-Z]$/.exec(newKey);
        if (match) {
            const {shortcut} = this.props;
            shortcut.key = newKey.toLowerCase();
            this.props.updateModel(shortcut)
        }
    }

    startNewHotkey = () => {
        const {shortcut} = this.props;
        shortcut.hotkeys.push(new AbstractHotkey());
        this.props.updateModel(shortcut);
    }

    renderHotkeys() {
        // for each slider
        const hotkeyCreators = this.props.shortcut.hotkeys.map((hotkey, i) => {
            const updateHotkey = (newHotkey) => {
                const {shortcut} = this.props;
                shortcut.hotkeys[i] = newHotkey;
                this.props.updateModel(shortcut);
            };

            const removeHotkey = () => {
                const {shortcut} = this.props;
                shortcut.hotkeys.splice(i, 1);
                this.props.updateModel(shortcut);
            };
            return (
                <HotkeyCreator
                    key={hotkey.id}
                    hotkey={hotkey}
                    updateModel={updateHotkey}
                    onDelete={removeHotkey}
                />
            );
        });

        return <div className="hotkey-creators">{hotkeyCreators}</div>;
    }

    renderShortcutKey() {
        const placeholder = "Enter a key";
        const shortcut = this.props.shortcut;
        const shortcutKeyModifiers = _.map(this.props.shortcut.modifiers, (modifier, i) => {
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
            <div className="shortcut-key-container">
                {shortcutKeyModifiers}
                <div
                    className="shortcut-key button"
                    onKeyDown={this.handleKeyInputChange}
                    tabIndex="-1"
                >
                    {this.props.shortcut.key || placeholder}
                </div>
            </div>
        );
    }

    renderAddHotkey() {
        if (this.props.shortcut.key === '') return null;
        return (
            <div className="add-hotkey button" onClick={this.startNewHotkey}>
                Add New Action
            </div>
        );
    }

    render() {
        return (
            <div className="shortcut">
                {this.renderShortcutKey()}
                {this.renderHotkeys()}
                {this.renderAddHotkey()}
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
