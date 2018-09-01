const { app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const {getFile, writeFile} = require('./main/fileUtils.js');

const isDev = () => {
    return process.mainModule.filename.indexOf('app.asar') === -1;
};

if (isDev()) require('electron-reload')(path.join(__dirname, 'build'));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    });
    win.maximize();
    // and load the index.html of the app.
    // win.loadURL(`http://localhost:8080`)
    win.loadURL(`file://${path.join(__dirname, 'build', 'index.html')}`);

    // Open the DevTools.
    if (isDev()) win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

ipcMain.on('open-dialog', (event) => {
    dialog.showOpenDialog({
        filters: [{
            name: `AutoHotkey ('.ahk')`,
            extensions: ['ahk']
        }],
        properties: ['openFile']
    }, async (filepaths) => {
        if (filepaths && filepaths[0]) {
            const filepath = filepaths[0];
            const file = await getFile(filepath);
            event.sender.send('open-file', path.basename(filepath) ,file);
        }
    });
});

ipcMain.on('save-script', (event, args) => {
    dialog.showSaveDialog({
        filters: [{
            name: `AutoHotkey ('.ahk')`,
            extensions: ['ahk']
        }],
        properties: ['openFile']
    }, async (filepath) => {
        await writeFile(filepath, args.text);
        event.sender.send('saved-script');
    });
});
