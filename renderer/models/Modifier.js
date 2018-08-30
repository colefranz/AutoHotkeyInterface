export default class ShortcutKey {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.active = false;
    }

    setActiveIfShortcutKeyTextMatches(shortcutKeyText) {
        this.active = shortcutKeyText.indexOf(this.symbol) !== -1;
    }

    toggleActive() {
        this.active = !this.active;
    }

    toString() {
        return this.active ? this.symbol : '';
    }
}
