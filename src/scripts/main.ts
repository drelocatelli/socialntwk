const fs = require('fs');
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, session } = require('electron');
const path = require('path');
class App {
    constructor() {
        app.whenReady().then(() => {
            const menu = Menu.buildFromTemplate([]);
            const win = this.init();
            // win.setMenu(menu);
            win.maximize();
            globalShortcut.register('cmdOrCtrl + J', () => win.webContents.toggleDevTools());
            this.requesfFile();
        });
    }

    init(): Electron.CrossProcessExports.BrowserWindow {
        const win = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true,
                preload: path.join(__dirname, 'preload.js'),
                webSecurity: true,
            },
        });
        session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => { 
            // details.requestHeaders["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"; 
            details.requestHeaders["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0";
            callback({ cancel: false, requestHeaders: details.requestHeaders }); 
        });
        win.loadFile('./src/static/index.html');

        return win;
    }

    requesfFile() {
        ipcMain.on('file-request', (event, filePath) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    event.reply('file-response', { error: err.message });
                } else {
                    event.reply('file-response', { data });
                }
            });
        });
    }
}

new App();
