const { contextBridge, ipcMain, ipcRenderer } = require('electron')
const fs = require('fs');

function getNetWorks() {
    try {
        const data = fs.readFileSync('./src/networks.json', 'utf-8');
        return data;
    } catch(err) {
        console.error(err);
    }
}

contextBridge.exposeInMainWorld('api', {
    networks: () => getNetWorks(),
});