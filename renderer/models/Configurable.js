export default class Configurable {
    constructor(values) {
        this._values = values;
        this._randomize = false;
    }

    get values() {
        return this._values;
    }

    get randomize() {
        return this._randomize;
    }

    set randomize(random) {
        return this._randomize = random;
    }

    updateValue(index, value) {
        this.values[index] = value;
    }
}
