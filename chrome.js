// chrome.js

// contains functions dealing with the chrome api, to be used in background.js

const createTab = (url, err) => {
  return new Promise((resolve, reject) => {
    return chrome.tabs.create({ url: url, selected: true }, resolve);
  }).catch(() => Promise.reject(err));
};

const executeFunction = (tabId, script, err, callback) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(
      tabId,
      { code: script },
      callback(resolve, reject)
    );
  }).catch(() => Promise.reject(err));
};

const closeTab = (tabId, err, callback) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tabId, callback(resolve, reject));
  }).catch(() => Promise.reject(err));
};

const focusTab = (tabId, err, callback) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tabId, { selected: true }, callback(resolve, reject));
  }).catch(() => Promise.reject(err));
};

export {
  createTab,
  executeFunction,
  closeTab,
  focusTab
}
