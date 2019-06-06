// test.js

import { expect } from "chai";
import { formScript } from "../src/helper.js";

// describes tests in the format of <nature of the function>_<nature of the arguments>
describe("form script test", function() {
  describe("normalfunction_withoutarguments", function() {
    it("should return 'good day'", function() {
      const str = "good day";
      const returnStr = function() {
        return str;
      };

      const script = formScript(returnStr);
      expect(eval(script)).to.equal(returnStr());
    });
  });

  describe("normalfunction_singleargument", function() {
    it("should return 'good day'", function() {
      const str = "good day";
      const returnStr = function(str) {
        return str;
      };

      const script = formScript(returnStr, [str]);
      console.log(eval(script));
      expect(eval(script)).to.equal(returnStr(str));
    });
  });

  describe("normalfunction_multiplearguments", function() {
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

  describe("emptyfunction_withoutarguments", function() {
    it("should return undefined", function() {
      const empty = function() {};
      const script = formScript(empty);
      expect(eval(script)).to.equal(empty());
    });
  });

  describe("emptyfunction_emptyarray", function() {
    it("should return undefined", function() {
      const empty = function() {};
      const script = formScript(empty, []);
      expect(eval(script)).to.equal(empty());
    });
  });
});
