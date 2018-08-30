export default class Configurable {
    constructor(values) {
        this._values = values;
    }

    get values() {
        return this._values;
    }

    updateValue(index, value) {
        this.values[index] = value;
    }

    toString() {
        return this.values.join(', ');
    }
}
