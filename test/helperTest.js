// helperTest.js

import { expect } from "chai";
import { formScript } from "../src/helper.js";

// describes tests in the format of <nature of the function>-<nature of the arguments>
describe("formScript test", function() {
  describe("normal function - without arguments", function() {
    it("should return 'good day'", function() {
      const str = "good day";
      const returnStr = function() {
        return str;
      };

      const script = formScript(returnStr);
      expect(eval(script)).to.equal(returnStr());
    });
  });

  describe("normal function - single argument", function() {
    it("should return 'good day'", function() {
      const str = "good day";
      const returnStr = function(str) {
        return str;
      };

      const script = formScript(returnStr, [str]);
      expect(eval(script)).to.equal(returnStr(str));
    });
  });

  describe("normal function - multiple arguments", function() {
    it("should return 'good day'", function() {
      const str1 = "good";
      const str2 = "day";
      const concat = function(str1, str2) {
        return str1 + " " + str2;
      };

      const script = formScript(concat, [str1, str2]);
      expect(eval(script)).to.equal(concat(str1, str2));
    });
  });

  describe("empty function - without arguments", function() {
    it("should return undefined", function() {
      const empty = function() {};
      const script = formScript(empty);
      expect(eval(script)).to.equal(empty());
    });
  });

  describe("empty function - empty array", function() {
    it("should return undefined", function() {
      const empty = function() {};
      const script = formScript(empty, []);
      expect(eval(script)).to.equal(empty());
    });
  });
});
