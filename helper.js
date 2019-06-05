// helper.js

const createTab = (url, err) => {
  return new Promise((resolve, reject) => {
    return chrome.tabs.create({ url: url, selected: true }, resolve);
  }).catch(() => Promise.reject(err));
};

const executeFunction = (tabId, script, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tabId, { code: script }, () =>
      chrome.runtime.lastError ? reject(err) : resolve()
    );
  }).catch(() => Promise.reject(err));
};

const sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const closeTab = (tabId, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tabId, () =>
      chrome.runtime.lastError ? reject(err) : resolve()
    );
  }).catch(() => Promise.reject(err));
};

const focusTab = (tabId, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tabId, { selected: true }, () =>
      chrome.runtime.lastError ? reject(err) : resolve()
    );
  }).catch(() => Promise.reject(err));
};

const clickDeleteAllButton = () => {
  // EXTENSION WON'T WORK IF THESE CHANGE
  const DELETE_ALL_SELECTOR = "jsname";
  const DELETE_ALL_SELECTOR_VALUE = "dQulXd";

  const button = document.querySelector(
    "[" +
      DELETE_ALL_SELECTOR +
      "=" +
      CSS.escape(DELETE_ALL_SELECTOR_VALUE) +
      "]"
  );
  if (button) button.click();
};

const clickConfirmDeleteButton = () => {
  // EXTENSION WON'T WORK IF THESE CHANGE
  const DELETE_CONFIRM_SELECTOR = "data-id";
  const DELETE_CONFIRM_SELECTOR_VALUE = "EBS5u";

  const button = document.querySelector(
    "[" +
      DELETE_CONFIRM_SELECTOR +
      "=" +
      CSS.escape(DELETE_CONFIRM_SELECTOR_VALUE) +
      "]"
  );
  if (button) button.click();
};

const formScript = (func, args) => {
  let script = "(" + func + ")";
  if (args && args.length > 0) {
    args.forEach(element => {
      script += "(" + element + ")";
    });
  } else {
    // call the function
    script += "()";
  }

  script = `${script}`;
  return script;
};

export {
  createTab,
  executeFunction,
  sleep,
  closeTab,
  focusTab,
  clickDeleteAllButton,
  clickConfirmDeleteButton,
  formScript
};
