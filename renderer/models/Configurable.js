export default class Configurable {
    constructor(values) {
        this._values = values;
    }

    get values() {
        return this._values;
    }

    set value(value) {
        this._values[0] = value;
    }

    updateValue(index, value) {
        this.values[index] = value;
    }

    toString() {
        return this.values.join(', ');
    }
}
