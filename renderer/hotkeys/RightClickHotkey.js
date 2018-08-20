import AbstractHotkey from './AbstractHotkey.js';

const matcher = /^Click, right$/;

export default class ClickHotkey extends AbstractHotkey {
    constructor(string) {
        super('right-click');
    }

    static stringMatches(string) {
        return matcher.exec(string) !== null;
    }
}
