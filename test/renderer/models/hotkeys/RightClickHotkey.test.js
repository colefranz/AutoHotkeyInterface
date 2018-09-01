import RightClickHotkey from '../../../../renderer/models/hotkeys/RightClickHotkey.js';

describe('Click hotkey', () => {
    it('should match properly', () => {
        expect(RightClickHotkey.stringMatches('Click, right')).toBe(true);
        expect(RightClickHotkey.stringMatches('Click, left')).toBe(false);
        expect(RightClickHotkey.stringMatches('Click, 123')).toBe(false);
        expect(RightClickHotkey.stringMatches('click, right')).toBe(false);
        expect(RightClickHotkey.stringMatches('Click, Right')).toBe(false);
        expect(RightClickHotkey.stringMatches('aClick, right')).toBe(false);
        expect(RightClickHotkey.stringMatches('Click, right2')).toBe(false);
    });
});
