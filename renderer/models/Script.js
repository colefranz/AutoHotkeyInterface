import Shortcut from './Shortcut.js';
import {ShortcutsToText, TextToShortcuts} from './ShortcutParser.js';

export default class Script {
    constructor(shortcutsAsText = '', scriptPath) {
        this.path = scriptPath;
        const textToShortcuts = new TextToShortcuts();
        const shortcuts = textToShortcuts.getShortcuts(shortcutsAsText);
        this.shortcuts = shortcuts;
    }

    get shortcutsAsText() {
        const shortcutsToText = new ShortcutsToText();
        return shortcutsToText.getText(this.shortcuts);
    }

    get fileName() {
        return this.path.replace(/^.*[\\\/]/, '')
    }

    addShortcut() {
        this.shortcuts.push(new Shortcut());
    }
}
