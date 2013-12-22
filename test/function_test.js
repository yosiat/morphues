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


  it("It should detect the body variables", function() {
    var results = morphues.analyze(helper.loadFixture("functions/function_body_variables"));

    var expectedVariables = [{ name: "str", type: "string" } , { name: "num", type: "number" }];

    assert.ok(_.has(results.functions[0], "body"), "function should have body");
    assert.ok(_.has(results.functions[0].body, "variables"), "function should have variables");
    assert.deepEqual(results.functions[0].body.variables, expectedVariables);
  });


  it("It should detect the return type for identifier return value", function() {
    var results = morphues.analyze(helper.loadFixture("functions/primitive_return_value"));


    assert.ok(_.has(results.functions[0], "returnType"), "function should have returnType");
    assert.equal(results.functions[0].returnType, "number");
  });

});
