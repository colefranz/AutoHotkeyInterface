import Hotkeys from './hotkeys/Hotkeys.js';
import Shortcut from './Shortcut.js';

export class ShortcutsToText {
    getText(shortcuts) {
        const textArray = shortcuts.map((shortcut) => {
            const string = shortcut.toString();
            return string;
        });

        return textArray.join('\n\n');
    }
}

export class TextToShortcuts {
    constructor() {
        this.shortcuts = [];
        this.currentRandomNumbers = null;
        this.currentShortcut = null;
        this.currentShortcutHandlers = [];
        this.noCurrentShortcutHandlers = [];
    }

    getShortcuts(shortcutsAsText) {
        const lines = shortcutsAsText.split('\n').map((line) => line.trim());

        lines.forEach((line) => this._handleLine(line));

        return this.shortcuts;
    }

    _handleReturn(line) {
        let handled = false;
        if (line === 'return') {
            this.currentShortcut = null;
            handled = true;
        }

        return handled;
    }

    _handleRandom(line) {
        let handled = false;
        const randomMatch = /^Random, rand, (\d+), (\d+)$/.exec(line);
        if (randomMatch) {
            this.currentRandomNumbers = [randomMatch[1], randomMatch[2]];
            handled = true;
        }

        return handled;
    }

    _handleHotkeyCreation(line) {
        let handled = false;
        const hotkeyToMake = Hotkeys.find((Hotkey) => Hotkey.stringMatches(line));

        if (hotkeyToMake) {
            const hotkey = new hotkeyToMake();
            hotkey.setFromString(line);
            if (this.currentRandomNumbers) {
                hotkey.setRandom(this.currentRandomNumbers);
            }
            this.currentShortcut.hotkeys.push(hotkey);
            this.currentRandomNumbers = null;
            handled = true;
        }
        return handled;
    }

    _handleLoop(line) {
        let handled = false;

        const loopMatch = /^Toggle([^ ]*)/.exec(line);
        if (loopMatch) {
            this.currentShortcut.id = loopMatch[1];
            this.currentShortcut.looping = true;
            handled = true;
        }

        return handled;
    }


    _handleShortcutCreation(line) {
        if (line.endsWith('::')) {
            const shortcutKeyText = line.split('::')[0];
            this.currentShortcut = new Shortcut(shortcutKeyText);
            this.shortcuts.push(this.currentShortcut);
        }
    }
    _handleLine(line) {
        if (!(line.length > 0)) return;

        let handlers = [];
        if (this.currentShortcut) {
            handlers.push(this._handleReturn, this._handleRandom, this._handleLoop, this._handleHotkeyCreation);
        } else {
            handlers.push(this._handleShortcutCreation);
        }

        handlers.find((handler) => {
            handler = handler.bind(this);
            handler(line);
        });
    }
}
