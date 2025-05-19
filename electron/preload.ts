import { ipcRenderer, contextBridge } from 'electron'

// Expondo métodos seguros do ipcRenderer para o Renderer (frontend)
contextBridge.exposeInMainWorld('ipcRenderer', {
  // Escuta eventos de um canal
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  // Remove o listener de um canal
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  // Envia mensagem para o processo principal
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  // Envia mensagem e espera resposta (promessa)
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  // Outros métodos podem ser adicionados aqui se necessário
})