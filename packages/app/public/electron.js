const { BrowserWindow, Menu, app, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    height: 900,
    icon: `${__dirname}/icon.icns`,
    minHeight: 800,
    minWidth: 1000,
    webPreferences: { nodeIntegration: true, webSecurity: false, nativeWindowOpen: true },
    width: 1100,
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => (mainWindow = null));
}

let template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) win.close();
              });
            }
            focusedWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F';
          } else {
            return 'F11';
          }
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I';
          } else {
            return 'Ctrl+Shift+I';
          }
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
      },
      {
        type: 'separator',
      },
    ],
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        type: 'separator',
      },
      {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: () => {
          app.emit('activate');
        },
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => {
          shell.openExternal('https://storycopter.com/');
        },
      },
    ],
  },
];

function addUpdateMenuItems(items, position) {
  if (process.mas) return;

  const version = app.getVersion();
  let updateItems = [
    {
      label: `Version ${version}`,
      enabled: false,
    },
    {
      label: 'Checking for Update',
      enabled: false,
      key: 'checkingForUpdate',
    },
    {
      label: 'Check for Update',
      visible: false,
      key: 'checkForUpdate',
      click: () => {
        require('electron').autoUpdater.checkForUpdates();
      },
    },
    {
      label: 'Restart and Install Update',
      enabled: true,
      visible: false,
      key: 'restartToUpdate',
      click: () => {
        require('electron').autoUpdater.quitAndInstall();
      },
    },
  ];

  items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu();
  if (!menu) return;

  let reopenMenuItem;
  menu.items.forEach(item => {
    if (item.submenu) {
      item.submenu.items.forEach(item => {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item;
        }
      });
    }
  });
  return reopenMenuItem;
}

if (process.platform === 'darwin') {
  const { name } = app;
  // const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Services',
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        label: `Hide ${name}`,
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  });

  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator',
    },
    {
      label: 'Bring All to Front',
      role: 'front',
    }
  );

  addUpdateMenuItems(template[0].submenu, 1);
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu;
  addUpdateMenuItems(helpMenu, 0);
}

app.on('ready', () => {
  createWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('browser-window-created', () => {
  let reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = false;
});

app.on('window-all-closed', () => {
  let reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = true;

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
