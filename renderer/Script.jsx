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

    // gonna gag that I have both of these, fix this ASAP
    componentWillMount() {
        if (this.props.shortcutsAsText) {
            const shortcuts = ShortcutModel.getShortcutsFromText(this.props.shortcutsAsText);
            this.setState({shortcuts});
        }
        this.setState({filepath: this.props.filepath});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shortcutsAsText) {
            const shortcuts = ShortcutModel.getShortcutsFromText(nextProps.shortcutsAsText);
            this.setState({shortcuts});
        }
        this.setState({filepath: nextProps.filepath});
    }

    cancel = () => {
        // TODO are you sure???
        this.props.onCancel();
    }

    save = () => {
        this.props.onSave(this.state.shortcuts, this.state.filepath);
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
                <div className="save-button button" onClick={this.save}>Save</div>
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
        // var filename = this.state.filepath.replace(/^.*[\\\/]/, '')
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
