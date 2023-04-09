const { contextBridge } = require('electron')
const path = require('path');
const fs = require('fs');

function getNetWorks() {
    try {
        const data = fs.readFileSync(path.join(__dirname, '..', 'networks.json'), 'utf-8');
        return data;
    } catch(err) {
        console.error(err);
    }
}

contextBridge.exposeInMainWorld('api', {
    networks: () => getNetWorks(),
});