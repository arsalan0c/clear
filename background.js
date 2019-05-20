let createTab = url => new Promise((resolve, reject) => {
	chrome.tabs.create({url: url, selected: true}, resolve);
});

let executeScript = (tabId, func) => new Promise((resolve, reject) => {
	let findAndClickButtonScript = `(${func})(${tabId})`;
	chrome.tabs.executeScript(tabId, {code: findAndClickButtonScript}, resolve);
});

let sleep = ms => new Promise(resolve => {
	setTimeout(resolve, ms);
});

let closeTab = tabId => new Promise((resolve, reject) => {
	chrome.tabs.remove(tabId, resolve);
});

let focusTab = tabId => new Promise((resolve, reject) => {
	chrome.tabs.update(tabId, {selected: true}, resolve);
});

chrome.browserAction.onClicked.addListener((originalTab) => {
	const SEARCH_ACTIVITY_URL = "https://myactivity.google.com/privacyadvisor/search";
	const SLEEP_DURATION = 1000;

	createTab(SEARCH_ACTIVITY_URL)
		.then(newTab => executeScript(newTab.id, clickDeleteAllButton))
		.then(newTabIdArr => {
			return executeScript(newTabIdArr[0], clickConfirmDeleteButton)
				.then(() => sleep(SLEEP_DURATION))
				.then(() => newTabIdArr);
		})
		.then(newTabIdArr => closeTab(newTabIdArr[0]))
		.then(() => focusTab(originalTab.id));
});

let clickDeleteAllButton = (tabId) => {
	const button = document.querySelector("[jsname=dQulXd]");
	if (button) {
		button.click();
	} else {

	}

	return tabId;
};

let clickConfirmDeleteButton = (tabId) => {
	const button = document.querySelector("[data-id=EBS5u]");
	if (button) {
		button.click();
	} else {

	}

	return tabId;
};