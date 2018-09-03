import React from 'react';
import Shortcut from './Shortcut.jsx';
import ShortcutModel from './models/Shortcut.js';
import ScriptModel from './models/Script.js';
import {ShortcutsToText, TextToShortcuts} from './models/ShortcutParser.js';

export default class Script extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            script: new ScriptModel(props.shortcutsAsText, props.filepath)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            script: new ScriptModel(nextProps.shortcutsAsText, nextProps.filepath)
        });
    }

    cancel = () => {
        // TODO are you sure???
        this.props.onCancel();
    }

    save = () => {
        this.props.onSave(this.state.script);
    }

    addShortcut = () => {
        this.state.script.addShortcut();
        this.setState({script: this.state.script});
    }

    renderExitingActions() {
        return (
            <div className="actions exiting-actions">
                <div className="cancel-button button" onClick={this.cancel}>Cancel</div>
                <div className="save-button button" onClick={this.save}>Save</div>
            </div>
        );
    }

    renderShortcuts() {
        const shortcuts = this.state.script.shortcuts.map((shortcut, i) => {
            const handleShortcutUpdate = (updatedShortcut) => {
                this.state.script.shortcuts[i] = updatedShortcut;
                this.setState({script: this.state.script});
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
    onSave: () => {},
    filepath: '',
    shortcutsAsText: ''
}
