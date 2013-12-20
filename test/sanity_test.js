var assert = require("assert"),
    fs = require("fs");
    morphues = require("../src/morphues");


function loadFixture(fixture_name) {
  return fs.readFileSync("test/fixtures/" + fixture_name + ".js").toString();
}


describe("Morphues", function() {

  describe("Variable Declarations", function() {

    it("should be able to detect number declarations", function() {
      var results = morphues.analyze(loadFixture("variable_declarations/number_declaration"));

      var expectedResult = {
        variables: [
          { name: "eliran", type: "number" }
        ]
      };

      assert.deepEqual(results, expectedResult);

    });


    it("should be able to detect string declarations", function() {
      var results = morphues.analyze(loadFixture("variable_declarations/string_declaration"));

      var expectedResult = {
        variables: [
          { name: "name", type: "string" }
        ]
      };

      assert.deepEqual(results, expectedResult);

    });


    describe("Array Delcaration", function(){

      it("should be able to detect array declarations", function() {
        var results = morphues.analyze(loadFixture("variable_declarations/array_declaration"));

        assert.equal(results.variables.length, 1); 
        assert.equal(results.variables[0].name, "items"); 
        assert.equal(results.variables[0].type, "array"); 
      });

      it("should be able to detect the type of the array items", function() {
        var results = morphues.analyze(loadFixture("variable_declarations/array_declaration"));

        var expectedResult = {
          variables: [
            { 
              name: "items",
              type: "array",
              itemTypes: [
                {
                  index: 0,
                  type: "number"
                },
                {
                  index: 1,
                  type: "string"
                }
              ]
            }
          ]
        };

        assert.deepEqual(results, expectedResult);
      });


    });

    it("should be able to detect anonymous function declaration", function(){
      var results = morphues.analyze(loadFixture("variable_declarations/anonymous_function_declaration"));

      assert.equal(results.variables.length, 1); 
      assert.equal(results.variables[0].name, "anonfn"); 
      assert.equal(results.variables[0].type, "function"); 

    });

    it("should be able to detect new instance declaration", function() {
      var results = morphues.analyze(loadFixture("variable_declarations/instance_declaration"));

      assert.equal(results.variables.length, 1); 
      assert.equal(results.variables[0].name, "instanceVariable"); 
      assert.equal(results.variables[0].type, "DummyInstance"); 
    });

    describe("Object Delcaration", function(){

      it("should be able to detect object declarations", function() {
        var results = morphues.analyze(loadFixture("variable_declarations/object_declaration"));

        assert.equal(results.variables.length, 1); 
        assert.equal(results.variables[0].name, "obj"); 
        assert.equal(results.variables[0].type, "object"); 
      });

      it("should be able to detect the type of the object properties", function() {
        var results = morphues.analyze(loadFixture("variable_declarations/object_declaration"));

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

        assert.deepEqual(results, expectedResult);
      });


    });

  });


});








