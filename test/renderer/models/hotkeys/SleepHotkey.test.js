import SleepHotkey from '../../../../renderer/models/hotkeys/SleepHotkey.js';

describe('Sleep hotkey', () => {
    it('should match properly', () => {
        expect(SleepHotkey.stringMatches('Sleep, 123')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep, 123456')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep, 1')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep, %rand%')).toBe(true);
        expect(SleepHotkey.stringMatches('Sleep 123')).toBe(false);
        expect(SleepHotkey.stringMatches('1Sleep, 123')).toBe(false);
        expect(SleepHotkey.stringMatches('Sleep, 123a')).toBe(false);
        expect(SleepHotkey.stringMatches('sleep, 123')).toBe(false);
        expect(SleepHotkey.stringMatches('Sleep, rand')).toBe(false);
    });

    it('should convert to string properly when randomized', () => {
        const hotkey = new SleepHotkey();
        hotkey.configurable.randomize = true;
        hotkey.configurable.values = [1, 3];
        expect(hotkey.toString()).toBe('Random, rand, 1, 3\nSleep, %rand%');
    });

    it('should convert to string properly when not randomized', () => {
        const hotkey = new SleepHotkey();
        hotkey.configurable.values = [25];
        expect(hotkey.toString()).toBe('Sleep, 25');
    });
});
