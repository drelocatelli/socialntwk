const { contextBridge, ipcMain, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('api', {
    send: (channel, value) => ipcRenderer.send(channel, value),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
});