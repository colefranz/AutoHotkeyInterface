import SleepHotkey from '../../../renderer/models/hotkeys/SleepHotkey.js';

describe('Sleep hotkey', () => {
    it('should match properly', () => {
        expect(SleepHotkey.stringMatches('Sleep, 123')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep, 123456')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep, 1')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep 123')).toBe(false);
        expect(SleepHotkey.stringMatches('1Sleep, 123')).toBe(false);
        expect(SleepHotkey.stringMatches('Sleep, 123a')).toBe(false);
        expect(SleepHotkey.stringMatches('sleep, 123')).toBe(false);
    });
});
