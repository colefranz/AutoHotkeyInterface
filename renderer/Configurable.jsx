import React from 'react';
import ConfigurableModel from './models/Configurable.js';

class HotkeyCreator extends React.Component {
    toggleCheckboxChange = () => {
        this.props.configurable.randomize = !this.props.configurable.randomize;
        this.props.updateModel(this.props.configurable);
    }

    renderRandomizeToggle() {
        return (
            <label>
                Randomize
                <input
                    type="checkbox"
                    value="Randomize"
                    checked={this.props.configurable.randomize}
                    onChange={this.toggleCheckboxChange}
                />
            </label>
        );
    }

    renderInputs() {
        return this.props.configurable.values.map((value, i) => {
            const onInputChange = (event) => {
                const input = event.target.value;
                this.props.configurable.updateValue(i, input);
                this.props.updateModel(this.props.configurable);
            };
            return <input
                key={i}
                type="number"
                value={value}
                onChange={onInputChange}
            />;
        });
    }

    render() {
        return (
            <div className="hotkey-creator">
                {this.renderRandomizeToggle()}
                {this.renderInputs()}
            </div>
        );
    }
}

HotkeyCreator.defaultProps = {
    configurable: new ConfigurableModel(),
    updateModel: () => {}
}

export default HotkeyCreator;
