import AbstractHotkey from './AbstractHotkey.js';

export default class ClickHotkey extends AbstractHotkey {
    static get matcher() {
        return /^Click, right$/;
    }
    static stringMatches(string) {
        return ClickHotkey.matcher.exec(string) !== null;
    }

    static get name() {
        return 'right click';
    }

    toString() {
        return ClickHotkey.matcher.source.replace('^', '').replace('$', '');
    }
}
