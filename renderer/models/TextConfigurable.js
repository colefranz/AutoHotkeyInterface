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
}
