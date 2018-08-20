module.exports = class Shortcut {
    constructor() {
        this.hotkeys = [];
        // maybe should assign a guid for key
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
}
