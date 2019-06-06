// helper.js

// contains helper functions, to be used in background.js

const sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const callback = (resolve, reject) => res =>
  chrome.runtime.lastError ? reject() : resolve(res);

// assumes func is a syntactically valid function
// args is an optional array. If present, its length should match the number of parameters of func
const formScript = (func, args) => {
  console.assert(typeof func === "function");

  let script = "(" + func + ")";
  if (!args) {
    script += "()";
  } else {
    console.assert(Array.isArray(args));
    console.assert(func.length === args.length);

    script += "(";
    args.forEach(arg => {
      script += "'" + arg + "'" + ",";
    });
    script += ")";
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
