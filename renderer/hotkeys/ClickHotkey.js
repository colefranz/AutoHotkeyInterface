import AbstractHotkey from './AbstractHotkey.js';

const matcher = /^Click$/;

module.exports = class ClickHotkey extends AbstractHotkey {
    constructor(string) {
        super('click');
    }

    static stringMatches(string) {
        return matcher.exec(string) !== null;
    }
}
