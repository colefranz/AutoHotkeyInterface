import React from 'react';
import { ipcRenderer } from 'electron';
import Script from './Script.jsx';

export default class AutoHotkeyInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayingScript: false,
            scriptName: undefined,
            scriptContents: undefined
        }
    }

    sendOpenDialogCommand() {
        ipcRenderer.send('open-dialog');
        ipcRenderer.on('open-file', (event, scriptName, scriptContents) => {
            this.setState({ scriptName, scriptContents });
        });
    }

    startNewScript = () => {
        this.setState({displayingScript: true});
    }

    stopDisplayingScript = () => {
        this.setState({displayingScript: false});
    }

    saveScript = (scriptContents) => {
        // TODO save script
        this.stopDisplayingScript();
    }

    renderScript() {
        return <Script onSave={this.saveScript} onCancel={this.stopDisplayingScript}/>
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
