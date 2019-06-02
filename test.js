// test.js

import {formScript} from "./helper.js";
import {expect} from "chai";

describe("form script test", function() {
	describe("without arguments", function() {
	    it("should return 'good day'", function() {
	    	let return_string = "good_day";
	    	let func = function() {
	    		return return_string;
	    	};

	    	let script = formScript(func);
	        expect(eval(script)).to.equal(func());
	    });
	});

	describe("with arguments", function() {
	    it("should return 'good day'", function() {
	    	let arg1 = "good";
	    	let arg2 = "day";
	    	let func = function(arg1, arg2) {
	    		return arg1 + " " + arg2;
	    	};

	    	let script = formScript(func, [arg1, arg2]);
	        expect(eval(script)).to.equal(func(arg1, arg2));
	    });
	});
});


