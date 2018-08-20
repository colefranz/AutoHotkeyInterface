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
                this.props.updateModel()
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

    render() {
        return (
            <div className="shortcut">
                {this.renderModifiers()}
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
