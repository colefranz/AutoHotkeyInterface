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
                <div className="cancel-button button" onClick={this.cancel}>Cancel</div>
                <div className="save-button button" onClick={this.props.onSave}>Save</div>
            </div>
        );
    }

    renderShortcuts() {
        const shortcuts = this.state.shortcuts.map((shortcut, i) => {
            const handleShortcutUpdate = (updatedShortcut) => {
                this.setState(({shortcuts}) => {
                    shortcuts[i] = updatedShortcut;

                    return {shortcuts};
                });
            };

            return <Shortcut key={i} updateModel={handleShortcutUpdate} shortcut={shortcut} />
        });

        // this key will break in no time, need a better key
        return (
            <div className="shortcuts">
                {shortcuts}
            </div>
        );
    }

    renderCreatingActions() {
        return (
            <div className="actions creating-actions">
                <div className="cancel-button button" onClick={this.addShortcut}>
                    Create new Shortcut
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="script">
                <div className="script-body">
                    {this.renderShortcuts()}
                    {this.renderCreatingActions()}
                </div>
                <div className="footer">
                    {this.renderExitingActions()}
                </div>
            </div>
        );
    }
}

Script.defaultProps = {
    onCancel: () => {},
    onSave: () => {}
}
