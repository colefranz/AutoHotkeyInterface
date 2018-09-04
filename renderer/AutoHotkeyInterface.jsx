import React from 'react';
import { ipcRenderer } from 'electron';
import Script from './Script.jsx';

export default class AutoHotkeyInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayingScript: false,
            scriptPath: '',
            scriptAsText: ''
        }
    }

    sendOpenDialogCommand = () => {
        ipcRenderer.send('open-dialog');
        ipcRenderer.on('open-file', (event, scriptPath, scriptAsText) => {
            this.setState({ displayingScript: true, scriptPath, scriptAsText });
        });
    }

    startNewScript = () => {
        const scriptPath = '';
        const scriptAsText = '';
        const displayingScript = true;
        this.setState({displayingScript, scriptPath, scriptAsText});
    }

    stopDisplayingScript = () => {
        this.setState({displayingScript: false});
    }

    saveScript = (script) => {
        const text = script.shortcutsAsText;
        const name = script.path;
        ipcRenderer.send('save-script', {text, name});
        this.stopDisplayingScript();
    }

    renderScript() {
        return <Script
            onSave={this.saveScript}
            onCancel={this.stopDisplayingScript}
            shortcutsAsText={this.state.scriptAsText}
        />;
    }

    renderActions() {
        return (
            <div className="actions">
                <div className="button" onClick={this.sendOpenDialogCommand}>Open File</div>
                <div className="button" onClick={this.startNewScript}>Create File</div>
            </div>
        );
    }

    render() {
        return (
            <div id="auto-hotkey-interface">
                <h1>autohotkey</h1>
                <h2>interface</h2>
                {this.state.displayingScript ? this.renderScript() : this.renderActions()}
            </div>
        );
    }
}
