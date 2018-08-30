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

    get configurable() {
        return this.configurables[0];
    }

    setFromString(string) {
        const match = SleepHotkey.matcher.exec(string);
        if (match) {
            this.configurable.value = match[1];
        }
    }

    toString() {
        if (this.configurable.randomize) {
            const pieces = [];
            pieces.push[`Random, rand, ${this.configurable.toString()}`];
            pieces.push('Sleep, %rand%');
            return pieces.join('\n');
        } else {
            return `Sleep, ${this.configurable.toString()}`;
        }
    }
}
