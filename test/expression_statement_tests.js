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

		it("should be able to add property to existing object",function(){
			var results = morphues.analyze(helper.loadFixture("expressions_statements/add_property_to_object"));

			var expectedResult = {
				variables: [
				{ 
					name: "obj",
					type: "object",
					properties: [
					{
						name: "n",
						type: "number"
					},
					{
						name: "b",
						type: "string"
					}
					]
				}
				]
			};

			assert.deepEqual(results.variables, expectedResult.variables);
		});

		it("should be able to update type of property for existing object",function(){
			var results = morphues.analyze(helper.loadFixture("expressions_statements/change_property_type_of_an_object"));

			var expectedResult = {
				variables: [
				{ 
					name: "obj",
					type: "object",
					properties: [
					{
						name: "n",
						type: "number"
					},
					{
						name: "b",
						type: "number"
					}
					]
				}
				]
			};

			assert.deepEqual(results.variables, expectedResult.variables);
		});
	});

});