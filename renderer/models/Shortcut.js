import _ from 'lodash';
import Modifier from './Modifier.js';

class Shortcut {
    constructor() {
        this.modifiers = {
            shiftKey: new Modifier('Shift', '+'),
            ctrlKey: new Modifier('Ctrl', '^'),
            altKey: new Modifier('Alt', '!'),
            winKey: new Modifier('Win', '#')
        };
        this.key = '';
        this.hotkeys = [];
        // maybe should assign a guid for react key
    }

    // insert hotkey at index
    addHotkey(hotkey, index = -1) {
        this.hotkeys.splice(0, index, hotkey)
    }

    removeHotkey(hotkeyToRemove) {
        const index = this.hotkeys.findIndex((hotkey) => hotkeyToRemove === hotkey);
        if (index !== -1) {
            this.hotkeys.splice(index, 1);
        }
    }

    extractShortcutKeys(shortcutKeyText) {
        _.forEach(this.modifiers, (modifier) => {
            modifier.setActiveIfShortcutKeyTextMatches(shortcutKeyText)
        });
    }

    toString() {
        let pieces = [];
        pieces.push(this.shortcutKeyToString());
        pieces = pieces.concat(this.hotkeys.map((hotkey) => hotkey.toString()));
        pieces.push('return');
        return pieces.join('\n');
    }

    shortcutKeyToString() {
        const modifiers = _.reduce(this.modifiers, (modifiersString, modifier) => {
            return modifiersString + modifier.toString();
        }, '');

        return `${modifiers}${this.key}::`;
    }
}

export default Shortcut;
