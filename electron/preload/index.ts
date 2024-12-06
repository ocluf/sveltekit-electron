const { contextBridge, ipcRenderer } = require('electron')

const api = {
  preload: () => {
    console.log("Preload function called")
  },
  main: () => {
    ipcRenderer.invoke("main-function")
  }
}

contextBridge.exposeInMainWorld("api", api)
