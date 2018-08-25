import SleepHotkey from './SleepHotkey.js';
import ClickHotkey from './ClickHotkey.js';
import RightClickHotkey from './RightClickHotkey.js';
import SendHotkey from './SendHotkey.js';

// this feels like it might need to change, or we can object freeze it and copy things off of it?
// it might just makes sense to have a class for each hotkey
export default [
    SleepHotkey,
    ClickHotkey,
    RightClickHotkey,
    SendHotkey
]
