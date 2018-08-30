import AbstractHotkey from './AbstractHotkey.js';
import NumberConfigurable from '../NumberConfigurable.js';

export default class SleepHotkey extends AbstractHotkey {
    constructor() {
        super();
        this.configurables.push(new NumberConfigurable());
    }

    static stringMatches(string) {
        return SleepHotkey.matcher.exec(string) !== null;
    }

    static get name() {
        return 'sleep';
    }

    static get matcher() {
        return /^Sleep, (\d+)$/;
    }

    setFromString(string) {
        const match = SleepHotkey.matcher.exec(string);
        if (match) {
            this.configurables[0].value = match[1];
        }
    }
}
