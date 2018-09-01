import React from 'react';
import ConfigurableModel from './models/Configurable.js';
import Toggle from './Toggle.jsx';
import NumberInput from './NumberInput.jsx';
import TextInput from './TextInput.jsx';

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

            if (type === 'number') {
                return <NumberInput key={i} value={value} onInput={onInputChange} />
            } else if (type === 'text') {
                return <TextInput key={i} value={value} onInput={onInputChange} />
            }
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
