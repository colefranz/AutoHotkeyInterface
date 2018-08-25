import ClickHotkey from '../../../renderer/models/hotkeys/ClickHotkey.js';

describe('Click hotkey', () => {
    it('should match properly', () => {
        expect(ClickHotkey.stringMatches('Click')).toBe(true);
        expect(ClickHotkey.stringMatches('Click 123')).toBe(false);
        expect(ClickHotkey.stringMatches('Click, a')).toBe(false);
        expect(ClickHotkey.stringMatches('aClick')).toBe(false);
        expect(ClickHotkey.stringMatches('click')).toBe(false);
    });
});
