// Original credit to HD & Jjs & AltoDev for BW Rewritten development.

const {app, BrowserWindow, dialog, Menu} = require('electron');
const console = require('console');
const path = require('path');
const { exit } = require('process');

app.console = new console.Console(process.stdout, process.stderr);

try {
    let pluginName = 'libpepflashplayer.so';

    app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));
    app.commandLine.appendSwitch('disable-http-cache');
    app.commandLine.appendSwitch('no-sandbox');
    
    let mainWindow;
    
    const server = 'https://play.binweevils.net';
    
    function clearCache() {
        if(mainWindow != null) mainWindow.webContents.session.clearCache();
    }
    
    async function createWindow () {
        mainWindow = new BrowserWindow({
            width: 1920,
            height: 1080,
            backgroundColor: '#6BC414',
            title: "Connecting...",
            icon: __dirname + '/favicon.ico',
            webPreferences: { 
                plugins: true 
            }
        });

        mainWindow.maximize();
        clearCache()
        mainWindow.loadURL('https://play.binweevils.net');

        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    }

    app.on('ready', async () => {
        await createWindow();
    });
    
    app.on('window-all-closed', function () {
        app.quit();
    });
    
    app.on('activate', async function () {
        if (mainWindow === null) await createWindow();
    });

    setInterval(clearCache, 600000);
}
catch(Exception) {
    app.quit();
    exit();
}
