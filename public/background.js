const injectedTabs = new Map()

chrome.runtime.onInstalled.addListener(() => {
	injectedTabs.clear()
})

chrome.tabs.onUpdated.addListener(async (tabId, { status }) => {
	if (status === 'loading') {
		injectedTabs.delete(tabId)
		toggleIcon(tabId, true)
	}
})

chrome.action.onClicked.addListener(async (tab) => {
	const isActive = injectedTabs.get(tab.id)

	await toggleIcon(tab.id)
	await injectScript(tab.id)
	await toggleStyle(tab.id)

	injectedTabs.set(tab.id, !isActive)
})

async function injectScript(tabId) {
	const [injectionFunc] = await chrome.scripting.executeScript({
		target: { tabId },
		func: () => {
			return window.__IMAGE_TRACER_EXTENSION_MOUNTED__
		},
	})

	const isInjected = injectionFunc.result

	if (!isInjected) {
		await chrome.scripting.executeScript({
			target: { tabId },
			files: ['index.js'],
		})

		await chrome.scripting.executeScript({
			target: { tabId },
			func: () => {
				window.__IMAGE_TRACER_EXTENSION_MOUNTED__ = true
			},
		})
	}
}

async function toggleIcon(tabId, value) {
	const isActive = value ?? injectedTabs.get(tabId)

	if (isActive) {
		await chrome.action.setIcon({
			tabId,
			path: {
				16: chrome.runtime.getURL('icons/16-grey.png'),
				32: chrome.runtime.getURL('icons/32-grey.png'),
				128: chrome.runtime.getURL('icons/128-grey.png'),
			},
		})
	} else {
		await chrome.action.setIcon({
			tabId,
			path: {
				16: chrome.runtime.getURL('icons/16.png'),
				32: chrome.runtime.getURL('icons/32.png'),
				128: chrome.runtime.getURL('icons/128.png'),
			},
		})
	}
}

async function toggleStyle(tabId) {
	const isActive = injectedTabs.get(tabId)

	if (isActive) {
		await chrome.scripting.removeCSS({
			target: { tabId },
			files: ['style.css'],
		})
	} else {
		await chrome.scripting.insertCSS({
			target: { tabId },
			files: ['style.css'],
		})
	}
}
