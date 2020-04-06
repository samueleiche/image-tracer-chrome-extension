chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.insertCSS(tab.id, { file: 'index.css' })
    chrome.tabs.executeScript(tab.id, { file: 'vue.min.js' })
    chrome.tabs.executeScript(tab.id, { file: 'index.js' })
    chrome.browserAction.disable(tab.id)
})
