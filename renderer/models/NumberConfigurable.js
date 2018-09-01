import Configurable from './Configurable.js';

export default class NumberConfigurable extends Configurable {
    constructor(values = [0, 0]) {
        super(values);
        this.type = 'number';
        this._randomize = false;
    }

    get values() {
        if (this.randomize) {
            return this._values;
        } else {
            return this._values.slice(0, 1);
        }
    }

    set values(values) {
        values = [].concat(values);
        this._values = values.map((value) => parseInt(value, 10));
    }

    get randomize() {
        return this._randomize;
    }

    set randomize(random) {
        this._randomize = random;
        this._sortValues();
    }

    cleanUp() {
        this._sortValues();
    }

    updateValue(index, event) {
        const value = event.target.value;
        const valueAsNumber = parseInt(value, 10);
        this._values[index] = valueAsNumber > 0 ? valueAsNumber : 0;
    }

    _sortValues() {
        if (this.randomize) this.values.sort((a, b) => a - b);
    }
}
