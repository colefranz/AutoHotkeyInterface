import SleepHotkey from './hotkeys/SleepHotkey.js';
import ClickHotkey from './hotkeys/ClickHotkey.js';
import RightClickHotkey from './hotkeys/RightClickHotkey.js';

// this feels like it might need to change, or we can object freeze it and copy things off of it?
// it might just makes sense to have a class for each hotkey
export default [
    SleepHotkey,
    ClickHotkey,
    RightClickHotkey
]
