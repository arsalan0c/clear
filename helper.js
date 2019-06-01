// helper.js

let createTab = (url, err) => {
  return new Promise((resolve, reject) => {
    return chrome.tabs.create({ url: url, selected: true }, resolve);
  }).catch(() => Promise.reject(err));
};

let executeFunction = (tabId, script, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tabId, { code: script }, resolve);
  }).catch(() => Promise.reject(err));
};

let sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

let closeTab = (tabId, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tabId, resolve);
  }).catch(() => Promise.reject(err));
};

let focusTab = (tabId, err) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tabId, { selected: true }, resolve);
  }).catch(() => Promise.reject(err));
};

let doesTabExist = tabId => {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, resolve);
  }).catch(() => false);
};

let clickDeleteAllButton = () => {
  // EXTENSION WON'T WORK IF THESE CHANGE
  var DELETE_ALL_SELECTOR = "jsname";
  var DELETE_ALL_SELECTOR_VALUE = "dQulXd";

  let button = document.querySelector(
    "[" +
      DELETE_ALL_SELECTOR +
      "=" +
      CSS.escape(DELETE_ALL_SELECTOR_VALUE) +
      "]"
  );
  if (button) button.click();
};

let clickConfirmDeleteButton = () => {
  // EXTENSION WON'T WORK IF THESE CHANGE
  var DELETE_CONFIRM_SELECTOR = "data-id";
  var DELETE_CONFIRM_SELECTOR_VALUE = "EBS5u";

  let button = document.querySelector(
    "[" +
      DELETE_CONFIRM_SELECTOR +
      "=" +
      CSS.escape(DELETE_CONFIRM_SELECTOR_VALUE) +
      "]"
  );
  if (button) button.click();
};

let formScript = (func, args) => {
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
  doesTabExist,
  clickDeleteAllButton,
  clickConfirmDeleteButton,
  formScript
};
