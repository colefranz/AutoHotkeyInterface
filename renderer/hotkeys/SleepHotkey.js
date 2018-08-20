import AbstractHotkey from './AbstractHotkey.js';

const matcher = /^Sleep, (\d+)$/;

export default class SleepHotkey extends AbstractHotkey {
    constructor(string) {
        super('sleep');
        const match = matcher.exec(string);
        this.configurables.push({
            type: 'number',
            value: match[1]
        });
    }

    static stringMatches(string) {
        return matcher.exec(string) !== null;
    }
}
