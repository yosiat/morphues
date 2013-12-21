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



});
