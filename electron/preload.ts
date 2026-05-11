import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('app:close'),
  minimizeWindow: () => ipcRenderer.send('app:minimize'),
  maximizeWindow: () => ipcRenderer.send('app:maximize'),
  unmaximizeWindow: () => ipcRenderer.send('app:unmaximize'),
  toggleMaximize: () => ipcRenderer.invoke('app:toggle-maximize'),
});
