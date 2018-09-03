import _ from 'lodash';
import uuid from 'uuid/v1';
import Modifier from './Modifier.js';

class Shortcut {
    constructor(shortcutKeyText = '') {
        this.modifiers = {
            shiftKey: new Modifier('Shift', '+'),
            ctrlKey: new Modifier('Ctrl', '^'),
            altKey: new Modifier('Alt', '!'),
            winKey: new Modifier('Win', '#')
        };
        this.key = '';
        this.hotkeys = [];
        this.looping = false;
        this.extractShortcutKeys(shortcutKeyText);
        this.id = uuid().replace(/-/g, '');
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
        const getKeyMatch = /(\w+)/.exec(shortcutKeyText);
        if (getKeyMatch) {
            this.key = getKeyMatch[1];
        }
    }

    toString() {
        let pieces = [];
        pieces.push(this.shortcutKeyToString());
        pieces = pieces.concat(this.hotkeys.map((hotkey) => hotkey.toString()));
        this._applyLooping(pieces);
        pieces.push('return');
        return pieces.join('\n');
    }

    shortcutKeyToString() {
        const modifiers = _.reduce(this.modifiers, (modifiersString, modifier) => {
            return modifiersString + modifier.toString();
        }, '');

        return `${modifiers}${this.key}::`;
    }

    /**
     * Given an array which should be set up as [shortcut, body] it will conditionally wrap
     * the body with a loop and unshift with a max threads command.
     * @param {arary} shortcutPieces
     */
    _applyLooping(shortcutPieces) {
        if (this.looping) {
            const toggleString = `Toggle${this.id}`;
            const loopFrontPieces = [];

            loopFrontPieces.push(`${toggleString} := !${toggleString}`)
            loopFrontPieces.push('loop');
            loopFrontPieces.push('{');
            loopFrontPieces.push(`If not ${toggleString}`);
            loopFrontPieces.push(`break`);
            shortcutPieces.splice(1, 0, ...loopFrontPieces);
            shortcutPieces.unshift('#MaxThreadsPerHotkey 2');
            shortcutPieces.push('}');
        }
    }
}

export default Shortcut;
