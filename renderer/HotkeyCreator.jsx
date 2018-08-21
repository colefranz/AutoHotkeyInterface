import React from 'react';
import AbstractHotkey from './hotkeys/AbstractHotkey.js';
import hotkeys from './Hotkeys.js';
import Dropdown from 'react-dropdown';

class HotkeyCreator extends React.Component {
    onSelectHotkeyType = (dropdownObject) => {
        const NewHotkey = dropdownObject.value;
        const {configurables, id} = this.props.hotkey;
        const newHotkey = new NewHotkey();
        newHotkey.applyConfigurables(configurables);
        newHotkey.id = id;
        this.props.changeHotkey(newHotkey);
    }
    renderNewHotkeyDropdown() {
        const dropdownOptions = hotkeys.map((hotkey) => {
            return {
                value: hotkey,
                label: hotkey.name
            };
        });
        const currentValue = dropdownOptions.find(({label}) => label === this.props.hotkey.name);

        return (
            <Dropdown
                options={dropdownOptions}
                placeholder="Select An Action Type"
                onChange={this.onSelectHotkeyType}
                value={currentValue}
            />
        );
    }

    renderConfigurables() {
        // for each slider
        console.log(this.props.hotkey.configurables)
        const configurables = this.props.hotkey.configurables.map((configurable, i) => {
            return <span key={i}>Slide me {configurable.value}</span>
        });

        return <div className="hotkey-configurables">{configurables}</div>;
    }

    renderActions() {
        return (
            <div className="hotkey-creation-actions">
                <button onClick={this.props.onDelete}>x</button>
            </div>
        );
    }

    render() {
        return (
            <div className="hotkey-creator">
                {this.renderNewHotkeyDropdown()}
                {this.renderConfigurables()}
                {this.renderActions()}
            </div>
        );
    }
}

HotkeyCreator.defaultProps = {
    hotkey: new AbstractHotkey(),
    changeHotkey: () => {},
    onDelete: () => {}
}

export default HotkeyCreator;
