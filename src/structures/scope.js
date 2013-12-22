var _ = require("lodash");

// TODO:
// Refactor this class, we too much code duplication
// when adding variable/function and retreiving it's metadata


var Scope = module.exports = function Scope() {
  this.variables = [];
  this.functions = [];


  // Index for variables and functions retrieval by their name
  this._variableIndex = {};
  this._functionIndex = {};
};

_.extend(Scope.prototype, {

  /*
   * Add variable to the current scope
   * @param {Metadata} metadata about the variable
   */
  addVariable: function(metadata) {
    var returnIndex = this.variables.push(metadata);
    this._variableIndex[metadata.name] = returnIndex - 1;
  },

  /*
   * Add function to the current scope
   * @param {FunctionMetadata} function metadata
   */
  addFunction: function(metadata) {
    var returnIndex = this.functions.push(metadata);
    this._functionIndex[metadata.name] = returnIndex - 1;
  },
  

  /*
   * Returns variable metadata by it's name
   * @param  {String} variable name
   * @return {Metadata} variable metadata
   */
  getVariableMetadata: function(name) {
    if(_.has(this._variableIndex, name)) {
      var variableIndex = this._variableIndex[name];
      return this.variables[variableIndex];
    }

    return null;
  },

  /*
   * Returns function metadata by it's name
   * @param  {String} function name
   * @return {FunctionMetadata} function metadata
   */
  getFunctionMetadata: function(name) {
    if(_.has(this._functionIndex, name)) {
      var functionIndex = this._functionIndex[name];
      return this.functions[functionIndex];
    }

    return null;

  },
});



