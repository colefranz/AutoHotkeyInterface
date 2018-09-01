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
            placeholder="Enter a key"
            type="text"
            value={this.props.value.toString()}
            className={this.props.className}
            onChange={() => {}}
            onKeyDown={this.props.onInput}
        />;
    }
}

NumberInput.defaultProps = {
    onInput: () => {},
    value: '',
    className: ''
}

export default NumberInput;
