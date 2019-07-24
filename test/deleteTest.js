// deleteTest.js

// tests for ensuring delete selectors and values are correct

import { expect } from "chai";
import puppeteer from "puppeteer";
import regeneratorRuntime from "regenerator-runtime"; // eslint-disable-line no-unused-vars
import UserAgent from "user-agents";

import {
  SEARCH_ACTIVITY_URL,
  DELETE_ALL_SELECTOR,
  DELETE_ALL_SELECTOR_VALUE,
  DELETE_CONFIRM_SELECTOR,
  DELETE_CONFIRM_SELECTOR_VALUE
} from "../src/attributes.js";

describe("existence of delete buttons test", function() {
  const SIGN_IN_PAGE =
    "https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/%3Fgws_rd%3Dssl";
  let email;
  let password;
  let page;

  before(function() {
    // stick to puppeteer's default timeouts
    this.timeout(0); // eslint-disable-line no-invalid-this
    if (!process.env.GOOGLE_EMAIL)
      throw new Error("GOOGLE_EMAIL environment variable is not set");
    if (!process.env.GOOGLE_PASSWORD)
      throw new Error("GOOGLE_PASSWORD environment variable is not set");

    email = process.env.GOOGLE_EMAIL;
    password = process.env.GOOGLE_PASSWORD;

    return new Promise(function(resolve, reject) {
      return puppeteer
        .launch({ headless: true })
        .then(async function(browser) {
          // sign in
          return browser
            .newPage()
            .then(function(pg) {
              page = pg;
              page
                .setUserAgent(new UserAgent().toString())
                .then(function() {
                  return page.goto(SIGN_IN_PAGE);
                })
                .then(function() {
                  return page.waitForSelector("#identifierId");
                })
                .then(function() {
                  return page.type("#identifierId", email, { delay: 5 });
                })
                .then(function() {
                  return page.click("#identifierNext");
                })
                .then(function() {
                  return page.waitForSelector(
                    "#password input[type='password']",
                    { visible: true }
                  );
                })
                .then(function() {
                  return page.type(
                    "#password input[type='password'",
                    password,
                    { delay: 5 }
                  );
                })
                .then(function() {
                  return page.click("#passwordNext");
                })
                .then(function() {
                  return page.waitFor(3000);
                })
                .then(function() {
                  resolve();
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  });

  // eslint-disable-next-line require-jsdoc
  function doesConfirmDeleteButtonExist(selector1, value1, selector2, value2) {
    return new Promise(function(resolve, reject) {
      return page
        .goto(SEARCH_ACTIVITY_URL)
        .then(function() {
          return page.click("[" + selector1 + "=" + "'" + value1 + "']");
        })
        .then(function() {
          return page.$("[" + selector2 + "=" + "'" + value2 + "']");
        })
        .then(function(element) {
          const doesButtonExist = element === null ? false : true;
          return resolve(doesButtonExist);
        })
        .catch(reject);
    });
  }

  it("should exist", function() {
    // stick to puppeteer's default timeouts
    this.timeout(0); // eslint-disable-line no-invalid-this
    return new Promise(function(resolve, reject) {
      doesConfirmDeleteButtonExist(
        DELETE_ALL_SELECTOR,
        DELETE_ALL_SELECTOR_VALUE,
        DELETE_CONFIRM_SELECTOR,
        DELETE_CONFIRM_SELECTOR_VALUE
      )
        .then(function(doesButtonExist) {
          expect(doesButtonExist).to.equal(true);
          resolve();
        })
        .catch(reject);
    });
  });

  it("should not exist - wrong first selector", function() {
    // stick to puppeteer's default timeouts
    this.timeout(0); // eslint-disable-line no-invalid-this
    return new Promise(function(resolve, reject) {
      doesConfirmDeleteButtonExist(
        "wrongSelector",
        DELETE_ALL_SELECTOR_VALUE,
        DELETE_CONFIRM_SELECTOR,
        DELETE_CONFIRM_SELECTOR_VALUE
      ).catch(function(err) {
        if (
          err.message ===
          "No node found for selector: [wrongSelector='" +
            DELETE_ALL_SELECTOR_VALUE +
            "']"
        ) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  });

  it("should not exist - wrong second value", function() {
    // stick to puppeteer's default timeouts
    this.timeout(0); // eslint-disable-line no-invalid-this
    return new Promise(function(resolve, reject) {
      doesConfirmDeleteButtonExist(
        DELETE_ALL_SELECTOR,
        DELETE_ALL_SELECTOR_VALUE,
        DELETE_CONFIRM_SELECTOR,
        "wrongValue"
      )
        .then(function(doesButtonExist) {
          expect(doesButtonExist).to.equal(false);
          resolve();
        })
        .catch(reject);
    });
  });
});
