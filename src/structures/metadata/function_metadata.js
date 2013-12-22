var _ = require("lodash"),
   util = require("util"),
   Scope = require("../scope"),
   Metadata = require("./metadata");

/*
 * Metadata for the primitive types like integer, string
 *
 * @base {Metadata}
 */
var FunctionMetadata = module.exports = function FunctionMetadata(node, provider) {
  this.parameters = [];
  this.body = new Scope();
  this.returnType = "";

  this._returnStatement = null;

  Metadata.call(this, node, provider);
};

util.inherits(FunctionMetadata, Metadata);

_.extend(FunctionMetadata.prototype, {
  /*
   * Get the types of the primitive from the node value
   * @params {Node} esprima node
   */
  initialize : function(node) {
    this.type = "function";

    // Get the function parameters
    _.each(node.params, _.bind(function(parameter){
      this.parameters.push({ name: parameter.name });
    }, this));

    // Get the from the nody body if we have the ReturnExpression node
    // if we have, save it for when the applyBodyScope will be called.
    var returnStatements = _.reject(node.body.body, function(bodyExpression) {
      return bodyExpression.type !== "ReturnStatement";
    });

    // If we have any return statement, take only the last
    if(returnStatements.length >= 1) {
      this._returnStatement = _.last(returnStatements);
    }

  },

  /*
   * Applies the scope body
   * @param {Scope} body scope
   */
  applyBodyScope : function(scope) {
    this.body = scope;

    if(this._returnStatement !== null) {
      // We have return statement, if the argument (what we return) is Identifier
      // let's fetch the variable type

      if(this._returnStatement.argument.type === "Identifier") {
        var variableName = this._returnStatement.argument.name;
        var variableMetadata = this.body.getVariableMetadata(variableName);
        if(variableMetadata !== null) {
          this.returnType = variableMetadata.type;
        }
      }
    }
  }
});

