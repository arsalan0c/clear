// helper.js

// contains helper functions, to be used in background.js

const sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const callback = (resolve, reject) => res =>
  chrome.runtime.lastError ? reject() : resolve(res);

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

export {
  sleep,
  callback,
  formScript,
  clickDeleteAllButton,
  clickConfirmDeleteButton
};
