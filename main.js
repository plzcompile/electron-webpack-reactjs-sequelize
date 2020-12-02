'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const MOUNTED = '[mounted]';
require('./lib/js/db/index');//Db must be called first before using any exported models. Will only create if not existant in the DB already.
const {User, Message} = require('./lib/js/db/models/index'); //Get our models for usage. Must manually export models to models/index.js, this could be improved

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
  //Set EXEC path in order for windows notifications to properly show up
  app.setAppUserModelId(process.execPath);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      show: false,
      // contextIsolation: true,
      webSecurity: true,
      enableRemoteModule: false, //Do not allow for security.
      frame: false,
      height:768,
      minHeight: 593,
      width: 1024,
      minWidth: 300,
      icon: '../src/assets/favicon.ico',
      webPreferences: {
          nodeIntegration: true,
      }  
    }
  )

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)
  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      mainWindow.webContents.openDevTools()
    }
  })

  //Added to force external urls to go to os shells browser (must have target="_blank" on anchor tags added for this to work)
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    try{
      require('electron').shell.openExternal(url);
    }catch(e){
      console.log(`Error creating new window ${e}`)
    }
    
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('recieveUsers', async (e, data) => { 
  if(data == MOUNTED){

    try{
      await User.prototype.createTestUser();
      const users = await User.findAll();
      mainWindow.webContents.send('recieveUsers', JSON.stringify(users, null, 2));//Push our data to component once mounted.
    }catch(e){
      console.log(`Error selecting users ${e}`);
    }
  }
});

ipcMain.on('close:window', function(e){
  app.quit();
});

ipcMain.on('minimize:window', function(e){
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('maximize:window', function(e){
  const focusedWin = BrowserWindow.getFocusedWindow();
  if(focusedWin !== null){
      if(focusedWin.isMaximized()){ 
          focusedWin.restore();
      }else {
          focusedWin.maximize();
      }
  }
});
