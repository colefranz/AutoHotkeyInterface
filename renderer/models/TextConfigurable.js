import Configurable from './Configurable.js'

export default class textConfigurable extends Configurable {
    constructor(values = ['']) {
        super(values);
        this.type = 'text';
    }

    get values() {
        return this._values;
    }

    updateValue(index, event) {
        const value = event.key;
        this._values[index] = value;
    }

    toString() {
        const values = this.values.map((value) => {
            if (value.length > 1) return `{${value}}`;
            else return value;
        });

        return values.join(', ');
    }
}
