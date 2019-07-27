// helper.js

// contains helper functions, to be used in background.js

const sleep = ms =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const callback = (resolve, reject) => res =>
  chrome.runtime.lastError ? reject() : resolve(res);

/**
 * Transforms a function along with arguments into a script which can be executed
 * @param {function} func
 * @param {?Array} args - optional arguments for func. If present, its length should match the number of parameters of func
 * @return {string} script - JS code to be executed
 */
const formScript = (func, args) => {
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

const clickButton = (selector, value) => {
  const button = document.querySelector(
    "[" + selector + "=" + CSS.escape(value) + "]"
  );

  if (!button) {
    chrome.runtime.sendMessage({
      scriptError:
        "no button found with selector: " + selector + " and value: " + value
    });
    return;
  }

  button.click();
};

export { sleep, callback, formScript, clickButton };
