import React from 'react';
import AbstractHotkey from './models/hotkeys/AbstractHotkey.js';
import hotkeys from './models/hotkeys/Hotkeys.js';
import Configurable from './Configurable.jsx';
import Dropdown from './Dropdown.jsx';
import DeleteIcon from '!svg-react-loader?name=DeleteIcon!./svg/close.svg';

class HotkeyCreator extends React.Component {
    onSelectHotkeyType = (dropdownObject) => {
        const NewHotkey = dropdownObject.value;
        const newHotkey = new NewHotkey();
        this.props.hotkey.copyTo(newHotkey);
        this.props.updateModel(newHotkey);
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
        const configurables = this.props.hotkey.configurables.map((configurable, i) => {
            const updateConfigurable = (updatedConfigurable) => {
                this.props.hotkey.configurables[i] = updatedConfigurable;
                this.props.updateModel(this.props.hotkey);
            };
            return <Configurable
                key={i}
                configurable={configurable}
                updateModel={updateConfigurable}
            />;
        });

        return <div className="hotkey-configurables">{configurables}</div>;
    }

    renderActions() {
        return (
            <div className="hotkey-actions">
                <div className="button" onClick={this.props.onDelete}>
                    <DeleteIcon className="icon" />
                </div>
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
    updateModel: () => {},
    onDelete: () => {}
}

export default HotkeyCreator;
