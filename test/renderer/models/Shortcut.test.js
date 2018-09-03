import Shortcut from '../../../renderer/models/Shortcut.js';
import sampleFile from '../../lib/sampleFile.js';

describe('Shortcut', () => {
    it('creates shortcuts from text', () => {
        const shortcuts = Shortcut.getShortcutsFromText(sampleFile);
        expect(shortcuts.length).toBe(2);
        const firstShortcut = shortcuts[0];
        expect(firstShortcut.hotkeys.length).toBe(4);
        expect(firstShortcut.hotkeys[0].constructor.name).toBe('sleep');
        expect(firstShortcut.hotkeys[0].configurable.randomize).toBe(true);
        expect(firstShortcut.hotkeys[0].configurable.values).toEqual([1, 3]);
        expect(firstShortcut.hotkeys[1].constructor.name).toBe('click');
        expect(firstShortcut.hotkeys[2].constructor.name).toBe('sleep');
        expect(firstShortcut.hotkeys[2].configurable.randomize).toBe(false);
        expect(firstShortcut.hotkeys[2].configurable.values).toEqual([5]);
        expect(firstShortcut.hotkeys[3].constructor.name).toBe('key press');
        expect(firstShortcut.hotkeys[3].configurable.values).toEqual(['Enter']);
        const secondShortcut = shortcuts[1];
        expect(secondShortcut.hotkeys.length).toBe(2);
        expect(secondShortcut.hotkeys[0].constructor.name).toBe('right click');
        expect(secondShortcut.hotkeys[1].constructor.name).toBe('key press');
        expect(secondShortcut.hotkeys[1].configurable.values).toEqual(['3']);
    });

    it('recreates the same text from shortcuts', () => {
        const shortcuts = Shortcut.getShortcutsFromText(sampleFile);
        expect(shortcuts.length).toBe(2);
        const firstShortcut = shortcuts[0];
        expect(firstShortcut.hotkeys.length).toBe(4);
        expect(firstShortcut.hotkeys[0].constructor.name).toBe('sleep');
        expect(firstShortcut.hotkeys[0].configurable.randomize).toBe(true);
        expect(firstShortcut.hotkeys[0].configurable.values).toEqual([1, 3]);
        expect(firstShortcut.hotkeys[1].constructor.name).toBe('click');
        expect(firstShortcut.hotkeys[2].constructor.name).toBe('sleep');
        expect(firstShortcut.hotkeys[2].configurable.randomize).toBe(false);
        expect(firstShortcut.hotkeys[2].configurable.values).toEqual([5]);
        expect(firstShortcut.hotkeys[3].constructor.name).toBe('key press');
        expect(firstShortcut.hotkeys[3].configurable.values).toEqual(['Enter']);
        const secondShortcut = shortcuts[1];
        expect(secondShortcut.hotkeys.length).toBe(2);
        expect(secondShortcut.hotkeys[0].constructor.name).toBe('right click');
        expect(secondShortcut.hotkeys[1].constructor.name).toBe('key press');
        expect(secondShortcut.hotkeys[1].configurable.values).toEqual(['3']);

        const textFromShortcuts = Shortcut.getTextFromShortcuts(shortcuts);
        expect(textFromShortcuts).toBe(sampleFile);
    });
});
