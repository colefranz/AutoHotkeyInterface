import AbstractHotkey from './AbstractHotkey.js';

const matcher = /^Click$/;

export default class ClickHotkey extends AbstractHotkey {
    constructor(string) {
        super();
    }

    static stringMatches(string) {
        return matcher.exec(string) !== null;
    }

    static get name() {
        return 'click';
    }
}
