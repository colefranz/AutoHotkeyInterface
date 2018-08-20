// really just an interface
module.exports = class AbstractHotkey {
    constructor(name) {
        this.name = name;
        this.configurables = [];
    }
}
