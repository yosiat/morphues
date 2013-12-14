var esprima = require("esprima"),
    walker = require("walkes"),
    _ = require("lodash");


var Scope = require("./structures/scope");
var M = require("./utils");


exports.analyze = function(sourceFile) {
  var tree = esprima.parse(sourceFile);

  var result = {};

  var globalScope = new Scope();

  walker(tree, {
    VariableDeclarator: function() {
        // get the identificatin for this variable declaration
        // and add it as variable 
        var identification = M.variableIdentificationsOf(this.init);
        identification.name = this.id.name;
        globalScope.addVariable(identification);

    }

  });


  return globalScope;
};



