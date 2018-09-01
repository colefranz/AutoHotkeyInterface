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
        return /^Sleep, (\d+|%rand%)$/;
    }

    get configurable() {
        return this.configurables[0];
    }

    setRandom(randomNumbers) {
        if (randomNumbers) {
            this.configurable.randomize = true;
            this.configurable.values = randomNumbers;
            this.configurable.randomize = true;
        }
    }

    setFromString(string) {
        const match = SleepHotkey.matcher.exec(string);
        if (match) {
            this.configurable.values = match[1];
        }
    }

    toString() {
        // all this logic should certainly be in the configurable
        if (this.configurable.randomize) {
            const pieces = [];
            pieces.push(`Random, rand, ${this.configurable.toString()}`);
            pieces.push('Sleep, %rand%');
            return pieces.join('\n');
        } else {
            return `Sleep, ${this.configurable.toString()}`;
        }
    }
}
