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
        this.setState({displayingScript: true});
    }

    stopDisplayingScript = () => {
        this.setState({displayingScript: false});
    }

    saveScript = (shortcuts, name) => {
        shortcuts.map((shortcut) => {
            const string = shortcut.toString();
            return string;
        });

        ipcRenderer.send('save-script', {
            text: shortcuts.join('\n\n'),
            name
        });
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
                <hr />
                {this.state.displayingScript ? this.renderScript() : this.renderActions()}
            </div>
        );
    }
}
