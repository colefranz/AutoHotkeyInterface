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
                <button onClick={this.sendOpenDialogCommand}>Open File</button>
                <button onClick={this.startNewScript}>Create File</button>
            </div>
        );
    }

    render() {
        return (
            <div id="auto-hotkey-interface">
                {this.state.displayingScript ? this.renderScript() : this.renderActions()}
            </div>
        );
    }
}
