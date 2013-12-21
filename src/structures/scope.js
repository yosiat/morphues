var _ = require("lodash");



var Scope = module.exports = function Scope() {
  this.variables = [];
  this.functions = [];
};

_.extend(Scope.prototype, {

  /*
   * Add variable to the current scope
   * @param {Metadata} metadata about the variable
   */
  addVariable: function(metadata) {
    this.variables.push(metadata);
  },

  /*
   * Add function to the current scope
   * @param {FunctionMetadata} function metadata
   */
  addFunction: function(metadata) {
    this.functions.push(metadata);
  }
});



