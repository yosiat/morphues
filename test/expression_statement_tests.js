var assert = require("assert"),
helper = require("./helper"),
morphues = require("../src/morphues");

describe("Expression Statements", function() {
	
	describe("Assignment Expression",function() {
		it("should be able to detect variable assignnment to number when he was string before",function(){
			var results = morphues.analyze(helper.loadFixture("expressions_statements/declare_string_and_do_number_assignment"));

			var expectedResult = {
				variables: [
				{ name: "eliran", type: "number" }
				]
			};

			assert.deepEqual(results.variables, expectedResult.variables);
		});
	});

});