// ================================================================
//  main.js — MediChain Panel Médico (Electron)
//  Panel de gestión para doctores. Layout horizontal con sidebar.
// ================================================================

const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    // ── Tamaño — este sitio es un dashboard de escritorio,
    //    necesita más espacio horizontal que la app del paciente.
    width:     1280,
    height:    800,
    minWidth:  900,
    minHeight: 600,

    title:           'MediChain — Panel Médico',
    backgroundColor: '#f4f6f9',   // Igual que --bg del CSS
    resizable:       true,
    center:          true,

    // ── Sin barra de menú nativa (Archivo, Editar, Ver…) ──────
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration:  false,
      contextIsolation: true,
      devTools:         false,   // Cambiar a true para depurar
    },

    // ── Ícono (coloca tu archivo en la misma carpeta) ─────────
    // icon: path.join(__dirname, 'icon.ico'),   // Windows
    // icon: path.join(__dirname, 'icon.icns'),  // Mac
  })

  // Carga tu index.html (debe estar en la misma carpeta)
  mainWindow.loadFile('index.html')

  // Quitar el menú de la barra superior
  Menu.setApplicationMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})