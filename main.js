const { app, BrowserWindow, dialog, ipcMain} = require('electron')
const fs = require('fs');
const path = require('path');
const fileUtils = require('./main/fileUtils.js');
require('electron-reload')(path.join(__dirname, 'build'));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600, autoHideMenuBar: true })

    // and load the index.html of the app.
    // win.loadURL(`http://localhost:8080`)
    win.loadURL(`file://${path.join(__dirname, 'build', 'index.html')}`);

    // Open the DevTools.
    win.webContents.openDevTools()

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
            const file = await fileUtils.getFile(filepath);
            event.sender.send('open-file', path.basename(filepath) ,file);
        }
    });
});
