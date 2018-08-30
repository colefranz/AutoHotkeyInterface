import Configurable from './Configurable.js';

export default class NumberConfigurable extends Configurable {
    constructor(values = [0, 0]) {
        super(values);
        this.type = 'number';
    }

    get values() {
        if (this.randomize) {
            return this._values;
        } else {
            return this._values.slice(0, 1);
        }
    }

    set randomize(random) {
        this._randomize = random;
        this._sortValues();
    }

    updateValue(index, event) {
        const value = event.target.value;
        const valueAsNumber = parseInt(value, 10);
        this._values[index] = valueAsNumber > 0 ? valueAsNumber : 0;
        this._sortValues();
    }

    _sortValues() {
        if (this.randomize) this.values.sort((a, b) => a - b);
    }
}
