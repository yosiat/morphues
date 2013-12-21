var assert = require("assert"),
    helper = require("./helper"),
    _ = require("lodash"),
    morphues = require("../src/morphues");

describe("Functions", function(){

  it("It should detect function declarations", function() {
    var results = morphues.analyze(helper.loadFixture("functions/simple"));

    assert.ok(_.has(results, "functions"), "results should have functions");
    assert.equal(results.functions.length, 1);
    assert.equal(results.functions[0].name, "dummyFunction");

  });


  it("It should detect function parameters", function() {
    var results = morphues.analyze(helper.loadFixture("functions/function_arguments"));

    var expectedParameters = [{ name: "parameter1" } , { name: "parameter2" }];

    assert.ok(_.has(results.functions[0], "parameters"), "function should have parameters");
    assert.deepEqual(results.functions[0].parameters, expectedParameters);
  });

});
