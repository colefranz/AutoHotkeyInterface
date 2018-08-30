import AbstractHotkey from './AbstractHotkey.js';

export default class ClickHotkey extends AbstractHotkey {
    static get matcher() {
        return /^Click$/;
    }
    static stringMatches(string) {
        return ClickHotkey.matcher.exec(string) !== null;
    }

    static get name() {
        return 'click';
    }
}
