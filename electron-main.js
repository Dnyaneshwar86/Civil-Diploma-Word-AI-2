const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: "CivilOS AI",
    backgroundColor: '#0b0e14',
    // Set icon if available (can be added later)
  });

  // Remove default menu bar for clean native app look
  win.setMenuBarVisibility(false);

  // Load the compiled web app
  win.loadFile(path.join(__dirname, 'dist', 'index.html')).catch((err) => {
    console.error("Failed to load index.html. Have you run 'npm run build' first?", err);
  });
}

// Boot up Electron
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
