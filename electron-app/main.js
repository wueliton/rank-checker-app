const { app, BrowserWindow, screen } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");

require(path.join(__dirname, "../back/dist/index.js"));

function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../front/dist/index.html"));
}

ipcMain.on("focus-main-window", () => {
  if (mainWindow) {
    mainWindow.restore(); // Restaura a janela se estiver minimizada
    mainWindow.focus(); // Foca na janela
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
