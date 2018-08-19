import React from 'react';

export default class Script extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        // this.cancel = this.cancel.bind(this);
    }

    cancel = () => {
        // TODO are you sure???
        this.props.onCancel();
    }

    renderActions() {
        return (
            <div className="actions">
                <button className="cancel-button" onClick={this.cancel}>Cancel</button>
                <button className="save-button" onClick={this.props.onSave}>Save</button>
            </div>
        )
    }

    render() {
        return (
            <div className="script">
                {this.renderActions()}
            </div>
        );
    }
}

Script.defaultProps = {
    onCancel: () => {},
    onSave: () => {}
}
