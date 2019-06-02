// test.js

import { formScript } from "./helper.js";
import { expect } from "chai";

describe("form script test", function() {
  describe("without arguments", function() {
    it("should return 'good day'", function() {
      const returnString = "good_day";
      const func = function() {
        return returnString;
      };

      const script = formScript(func);
      expect(eval(script)).to.equal(func());
    });
  });
});
