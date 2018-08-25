import AbstractHotkey from './AbstractHotkey.js';
import NumberConfigurable from '../NumberConfigurable.js';

const matcher = /^Sleep, (\d+)$/;

export default class SleepHotkey extends AbstractHotkey {
    constructor() {
        super();
        this.configurables.push(new NumberConfigurable());
    }

    static stringMatches(string) {
        return matcher.exec(string) !== null;
    }

    static get name() {
        return 'sleep';
    }

    setFromString(string) {
        const match = matcher.exec(string);
        if (match) {
            this.configurables[0].value = match[1];
        }
    }
}
