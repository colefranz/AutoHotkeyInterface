import AbstractHotkey from './AbstractHotkey.js';
import TextConfigurable from '../TextConfigurable.js';

// TODO include Modifiers here, need a match for each of them and will
// require some refactoring to make that usable here too
// map of {Key: Output}
const keyMap = new Map();
keyMap.set('ArrowLeft', '{Left}');
keyMap.set('ArrowRight', '{Right}');
keyMap.set('ArrowUp', '{Up}');
keyMap.set('ArrowDown', '{Down}');
keyMap.set(' ', '{Space}');

export default class SendHotkey extends AbstractHotkey {
    constructor() {
        super();
        this.configurables.push(new TextConfigurable());
    }

    static stringMatches(string) {
        return SendHotkey.matcher.exec(string) !== null;
    }

    static get name() {
        return 'key press';
    }

    static get matcher() {
        return /^Send (\{[0-9a-zA-Z]+\}|[0-9a-zA-Z])$/;
    }

    get configurable() {
        return this.configurables[0];
    }

    setFromString(string) {
        const match = SendHotkey.matcher.exec(string);
        if (match) {
            this.configurable.value = match[1].replace('{', '').replace('}', '');
        }
    }

    setValue(key) {
        const updateValue = (key) => this.configurables[0].value = key;
        if (keyMap.has(key)) {
            updateValue(keyMap.get(key));
        } else if (key.length === 1) {
            updateValue(key);
        } else {
            updateValue(`{${key}}`);
        }
    }

    toString() {
        return `Send ${this.configurable.toString()}`;
    }
}
