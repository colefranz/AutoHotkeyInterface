import SendHotkey from '../../../renderer/models/hotkeys/SendHotkey.js';

describe('Send hotkey', () => {
    it('should match properly', () => {
        expect(SendHotkey.stringMatches('Send 1')).toBe(true);
        expect(SendHotkey.stringMatches('Send {a}')).toBe(true);
        expect(SendHotkey.stringMatches('Send A')).toBe(true);
        expect(SendHotkey.stringMatches('Send {123}')).toBe(true);
        expect(SendHotkey.stringMatches('Send 123')).toBe(false);
        expect(SendHotkey.stringMatches('Send {enter}')).toBe(true);
        expect(SendHotkey.stringMatches('Send enter')).toBe(false);
        expect(SendHotkey.stringMatches('Send {enter')).toBe(false);
        expect(SendHotkey.stringMatches('Send enter}')).toBe(false);
    });
});
