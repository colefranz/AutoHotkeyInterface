import React from 'react';
import _ from 'lodash';
import ShortcutModel from './models/Shortcut.js';
import Modifier from './Modifier.jsx';
import Hotkey from './Hotkey.jsx';
import Dropdown from 'react-dropdown';
import hotkeys from './Hotkeys.js'

class Shortcut extends React.Component {
    constructor() {
        super();
        this.state = {
            inProgress: false
        };
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

    startNewHotkey = () => {
        this.setState({inProgress: true});
    }

    // maybe have hotkey jsx use this as the name and then the configurables change as the selected type changes
    onSelectHotkeyType = (val) => {
        console.log(val);
    }

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
            <div className="shortcut-keys">
                {shortcutKeys}
            </div>
        )
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

    renderAddHotkey() {
        return (
            <div className="add-hotkey-button" onClick={this.startNewHotkey}>
                Add New Action
            </div>
        )
    }

    renderNewHotkeyDropdown() {
        const dropdownOptions = hotkeys.map((hotkey) => {
            return {
                value: hotkey,
                label: hotkey.name
            };
        });
        return (
            <Dropdown
                options={dropdownOptions}
                placeholder="Select An Action Type"
                onChange={this.onSelectHotkeyType}
            />
        );
    }

    render() {
        return (
            <div className="shortcut">
                {this.renderShortcutKey()}
                {this.renderHotkeys()}
                {this.renderAddHotkey()}
                {this.state.inProgress && this.renderNewHotkeyDropdown()}
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
