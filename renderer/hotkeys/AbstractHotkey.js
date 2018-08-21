export default class AbstractHotkey {
    constructor(name) {
        this.configurables = [];
    }

    static get name() {
        throw new Error('Name getter not implemented by class');
    }
}
