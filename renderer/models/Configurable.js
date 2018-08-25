export default class Configurable {
    constructor(randomize = false, values = [0, 0]) {
        this._values = values;
        this._randomize = randomize;
    }

    get values() {
        if (this.randomize) {
            return this._values;
        } else {
            return this._values.slice(0, 1);
        }
    }

    get randomize() {
        return this._randomize;
    }

    set randomize(random) {
        return this._randomize = random;
    }

    updateValue(index, value) {
        const valueAsNumber = parseInt(value, 10);
        this._values[index] = valueAsNumber > 0 ? valueAsNumber : 0;
        if (this.randomize) this.values.sort((a, b) => a - b);
    }
}
