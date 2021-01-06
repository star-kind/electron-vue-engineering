import { app, BrowserWindow } from 'electron'

// 引入ipcMain
const { ipcMain } = require('electron')

// 引入对话框与IPC通信模块
const ipc1 = require('electron').ipcMain
const dialog = require('electron').dialog

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        webPreferences: {
            nodeIntegration: true //在网页中集成Node
        }
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// 接收来自标识为asynchronous-message的消息
ipcMain.on('asynchronous-message', function(event, arg) {
    // 返回标识为asynchronous-reply的消息
    event.sender.send('asynchronous-reply', '我,主进程,在此回应你');
})

// 绑定打开对话框事件
ipcMain.on('open-directory-dialog', function(event, p) {
    dialog.showOpenDialog({
        properties: [p]
    }, function(files) {
        if (files) { //若选中,则发送选择对象予以进程
            event.sender.send('selectedItem', files[0]);
        }
    })
})

// 定义IPC主进程响应函数
ipc1.on('open-save-chart-dialog', function(event) {
    dialog.showSaveDialog({
        title: '保存图像文件',
        defaultPath: '/DiaLogDemo',
        filters: [{
            name: 'Images',
            extensions: ['png', 'jpg']
        }]
    }, function(filename) {
        // 通知渲染进程，将获取到的文件路径传给Vue组件中响应函数
        event.sender.send('save-finished', filename);
    })
})