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

const clickButton = (selector, value) => {
  const button = document.querySelector(
    "[" + selector + "=" + CSS.escape(value) + "]"
  );

  if (button) button.click();
};

export { sleep, callback, formScript, clickButton };
