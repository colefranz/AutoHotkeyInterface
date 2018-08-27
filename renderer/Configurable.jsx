import React from 'react';
import ConfigurableModel from './models/Configurable.js';
import Toggle from './Toggle.jsx';

class HotkeyCreator extends React.Component {
    toggleCheckboxChange = () => {
        this.props.configurable.randomize = !this.props.configurable.randomize;
        this.props.updateModel(this.props.configurable);
    }

    renderRandomizeToggle() {
        return (
            <Toggle
                label="Randomize"
                toggle={this.toggleCheckboxChange}
                active={this.props.configurable.randomize}
            />
        );
    }

    renderInputs(type) {
        return this.props.configurable.values.map((value, i) => {
            const onInputChange = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.props.configurable.updateValue(i, event);
                this.props.updateModel(this.props.configurable);
            };
            // honestly maybe we should just have 2 different renderables at this point
            // needs to be onKeyDown so that we can get `event.key` as a change event does not have it
            const eventToListenTo = type === 'number' ? 'onChange' : 'onKeyDown';
            const inputProps = {
                key: i,
                type,
                value,
                [eventToListenTo]: onInputChange
            };

            return <input {...inputProps} />;
        });
    }

    render() {
        const type = this.props.configurable.type;
        return (
            <div className="configurable">
                {type === 'number' && this.renderRandomizeToggle()}
                {this.renderInputs(type)}
            </div>
        );
    }
}

HotkeyCreator.defaultProps = {
    configurable: new ConfigurableModel(),
    updateModel: () => {}
}

export default HotkeyCreator;
