var _ = require("lodash");



var Scope = module.exports = function Scope() {
  this.variables = [];
};

_.extend(Scope.prototype, {

  /*
   * Add variable to the current scope
   */
  addVariable: function(metadata) {
    this.variables.push(metadata);
  }

});



