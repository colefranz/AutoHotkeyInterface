import uuid from 'uuid/v1';

export default class AbstractHotkey {
    constructor() {
        this.configurables = [];
        this.id = uuid();
    }

    static get name() {
        return '';
    }

    get name() {
        return this.constructor.name;
    }

    applyConfigurables(configurables) {
        if (!configurables) return;
        for (let i = 0; i < this.configurables.length; i++) {
            if (configurables[i] && this.configurables[i].type === configurables[i].type) {
                this.configurables[i] = configurables[i];
            } else {
                break;
            }
        }
    }

    toString() {
        throw new Error(`Abstract method toString not implemented by child class`);
    }
}
