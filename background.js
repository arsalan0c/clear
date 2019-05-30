const SEARCH_ACTIVITY_URL = "https://myactivity.google.com/privacyadvisor/search";
const SLEEP_DURATION = 1000;

const POS_RESULT_MSG = "Result: your search activity has been deleted."
const NEG_RESULT_MSG = "Result: your search activity remains with Google.";
const CREATE_TAB_ERR = "Error: failed to create a new tab.";
const DELETE_ERR = "Error: failed to delete.";
const CLOSE_ERR = "Error: failed to close created tab.";
const RETURN_ERR = "Error: failed to switch back to original tab.";

chrome.browserAction.onClicked.addListener((originalTab) => {
	let newTabId;

	createTab(SEARCH_ACTIVITY_URL, CREATE_TAB_ERR)
		.then(newTab => {
			if (!newTab) return Promise.reject(CREATE_TAB_ERR + "\n" + NEG_RESULT_MSG);
			newTabId = newTab.id;
		})
		.then(() => executeFunction(newTabId, clickDeleteAllButton, DELETE_ERR + "\n" + NEG_RESULT_MSG))
		.then(() => executeFunction(newTabId, clickConfirmDeleteButton, DELETE_ERR + "\n" + NEG_RESULT_MSG))
		.then(() => sleep(SLEEP_DURATION))
		.then(() => closeTab(newTabId, CLOSE_ERR + "\n" + POS_RESULT_MSG))
		.then(() => doesTabExist(originalTab.id))
		.then(doesOriginalTabExist => {
			// non-critical step
			// if tab does not exist, assumes user closed deliberately
			if (doesOriginalTabExist) return focusTab(originalTab.id, RETURN_ERR + "\n" + POS_RESULT_MSG);
		})
		.then(() => alert(POS_RESULT_MSG))
		.catch(err => alert(err));
});

let createTab = (url, err) => {
	return new Promise((resolve, reject) => {
		return chrome.tabs.create({url: url, selected: true}, resolve);
	}).catch(() => Promise.reject(err));
};

let executeFunction = (tabId, func, err) => {
	return new Promise((resolve, reject) => {
		let script = `(${func})(${tabId})`;
		chrome.tabs.executeScript(tabId, {code: script}, resolve);
	}).catch(() => Promise.reject(err));
};

let sleep = ms => new Promise((resolve, reject) => {
	setTimeout(resolve, ms);
});

let closeTab = (tabId, err) => {
	return new Promise((resolve, reject) => {
		chrome.tabs.remove(tabId, resolve);
	}).catch(() => Promise.reject(err));
};

let focusTab = (tabId, err) => {
	return new Promise((resolve, reject) => {
		chrome.tabs.update(tabId, {selected: true}, resolve);
	}).catch(() => Promise.reject(err));
};

let doesTabExist = (tabId) => {
	return new Promise((resolve, reject) => {
		chrome.tabs.get(tabId, resolve);
	}).catch(() => false);
};

let clickDeleteAllButton = (tabId) => {
	const button = document.querySelector("[jsname=dQulXd]");
	if (button) {
		button.click();
		return tabId;
	}

	throw new Error();
};

let clickConfirmDeleteButton = (tabId) => {
	const button = document.querySelector("[data-id=EBS5u]");
	if (button) {
		button.click();
		return tabId;
	}

	throw new Error();
};