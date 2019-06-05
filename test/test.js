// test.js

import { expect } from "chai";
import { formScript } from "../src/helper.js";

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
