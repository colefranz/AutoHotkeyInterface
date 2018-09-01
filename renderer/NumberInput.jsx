import React from 'react';

class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    componentDidMount() {
        this.input.current.focus();
    }

    render() {
        return <input
            ref={this.input}
            placeholder="0"
            type="number"
            value={this.props.value.toString()}
            onChange={this.props.onInput}
        />;
    }
}

NumberInput.defaultProps = {
    onInput: () => {},
    value: ''
}

export default NumberInput;
