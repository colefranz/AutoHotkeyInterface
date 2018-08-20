import React from 'react';
import Shortcut from './Shortcut.jsx';
import ShortcutModel from './models/Shortcut.js';

export default class Script extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shortcuts: []
        };
    }

    cancel = () => {
        // TODO are you sure???
        this.props.onCancel();
    }

    addShortcut = () => {
        // TODO are you sure???
        this.setState(({shortcuts}) => {
            shortcuts.push(new ShortcutModel());

            return {shortcuts};
        });
    }

    renderExitingActions() {
        return (
            <div className="actions exiting-actions">
                <button className="cancel-button" onClick={this.cancel}>Cancel</button>
                <button className="save-button" onClick={this.props.onSave}>Save</button>
            </div>
        );
    }

    renderShortcuts() {
        // this key will break in no time, need a better key
        return (
            <div className="shortcuts">
                {this.state.shortcuts.map((shortcut, i) => {
                    return <Shortcut key={i} shortcut={shortcut} />
                })}
            </div>
        )
    }

    renderCreatingActions() {
        return (
            <div className="actions creating-actions">
                <button className="cancel-button" onClick={this.addShortcut}>
                    Create new Shortcut
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="script">
                {this.renderExitingActions()}
                {this.renderShortcuts()}
                {this.renderCreatingActions()}
            </div>
        );
    }
}

Script.defaultProps = {
    onCancel: () => {},
    onSave: () => {}
}