import _ from 'lodash';
import Modifier from './Modifier.js';
import Hotkeys from './hotkeys/Hotkeys.js';

const randomMatcher = /^Random, rand, (\d+), (\d+)$/;

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
        this.extractShortcutKeys(shortcutKeyText);
        // maybe should assign a guid for react key
    }

    static getTextFromShortcuts(shortcuts) {
        const textArray = shortcuts.map((shortcut) => {
            const string = shortcut.toString();
            return string;
        });

        return textArray.join('\n\n');
    }

    static getShortcutsFromText(shortcutsAsText) {
        const lines = shortcutsAsText.split('\n').map((line) => line.trim());

        // essentially a state machine where if we have random numbers then we know to apply
        // it to the next line and if the currentShortcut is set it means we are looking for
        // hotkeys or a return
        let shortcuts = [];
        let randomNumbers = null;
        let currentShortcut = null;
        const currentShortcutHandlers = [];
        const noCurrentShortcutHandlers = [];

        function handleReturn(line) {
            let handled = false;
            if (line === 'return') {
                currentShortcut = null;
                handled = true;
            }

            return handled;
        }

        function handleRandom(line) {
            let handled = false;
            const randomMatch = randomMatcher.exec(line);
            if (randomMatch) {
                randomNumbers = [randomMatch[1], randomMatch[2]];
                handled = true;
            }

            return handled;
        }

        function handleHotkeyCreation(line) {
            let handled = false;
            const hotkeyToMake = Hotkeys.find((Hotkey) => Hotkey.stringMatches(line));

            if (hotkeyToMake) {
                const hotkey = new hotkeyToMake();
                hotkey.setFromString(line);
                if (randomNumbers) {
                    hotkey.setRandom(randomNumbers);
                }
                currentShortcut.hotkeys.push(hotkey);
                randomNumbers = null;
                handled = true;
            }
            return handled;
        }

        function handleShortcutCreation(line) {
            if (line.endsWith('::')) {
                const shortcutKeyText = line.split('::')[0];
                currentShortcut = new Shortcut(shortcutKeyText);
                shortcuts.push(currentShortcut);
            }
        }

        function tryHandlersUntilHandled(handlers, line) {
            handlers.find((handler) => {
                handler(line);
            });
        }

        currentShortcutHandlers.push(handleReturn, handleRandom, handleHotkeyCreation);
        noCurrentShortcutHandlers.push(handleShortcutCreation);

        lines.forEach((line) => {
            // return if the line aint got stuff
            if (!(line.length > 0)) return;

            if (currentShortcut) {
                // iterate until its been handled
                tryHandlersUntilHandled(currentShortcutHandlers, line);
            } else {
                tryHandlersUntilHandled(noCurrentShortcutHandlers, line);
            }
        });

        return shortcuts;
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
