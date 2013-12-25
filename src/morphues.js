var esprima = require("esprima"),
    walker = require("walkes"),
    _ = require("lodash");


var Scope = require("./structures/scope");
var metadataProvider = require("./structures/metadata_provider");


function Morpheus() {
  this.currentScope = new Scope();
  this.tree = {};
  this.metadataProvider = metadataProvider.getMetadataProvider();
}


_.extend(Morpheus.prototype, {
  /*
   * Analyzes the given source file (as string), and returns the
   * scopes metadata.
   *
   * @param  {string} sourceFile - the source file as string
   * @return {Scope} global scope
   */
  analyze : function(sourceFile) {
    if(!_.isString(sourceFile) || sourceFile.length === 0) {
      throw new Error("sourceFile: should be non empty string");
    }

    this.tree = esprima.parse(sourceFile);
    this._walkTree();

    return this.currentScope;
  },

  /*
   * Starts walking the current tree
   */
  _walkTree : function() {
    walker(this.tree, this._getVisitors());
  },

  /*
   * Get all visitors, and change their their scope to be "Morpheus" scope
   * @return {Object} key - visitor name, value - function
   */
  _getVisitors : function() {
    var visitors = {};
    _.each(this.visitors, function(visitor, name) {
      visitors[name] = visitor.bind(this);
    }.bind(this));

    return visitors;
  },

  getNodeMetadata : function(node, nodeIdentifier) {
    var nodeMetadata = this.metadataProvider.provide(node);
    nodeMetadata.name = nodeIdentifier.name;

    return nodeMetadata;
  },
  /*
   * The AST visitors, each visitor be walk others ast node types of the tree,
   * their 'this' scope, will be Morpheus, please see Morpheus.prototype._walkTree
   */
  visitors : {
    /*
     * Handles variable declarations, simple get infered values from the left side
     * declarations
     */
    VariableDeclarator: function variableDeclarator(node) {
      var nodeMetadata = this.getNodeMetadata(node.init, node.id);
      this.currentScope.addOrUpdateVariable(nodeMetadata);
    },
    /*
     * Handles functions declarations
     */
    FunctionDeclaration: function functionDeclaration(node, recurse) {
      var nodeMetadata = this.getNodeMetadata(node, node.id);

      // Change the scope of the function, and save the old one
      var oldScope = this.currentScope;
      this.currentScope = new Scope();

      recurse(node.body);

      // Apply the new scope and change the scope to the old one
      nodeMetadata.applyBodyScope(this.currentScope);
      this.currentScope = oldScope;

      this.currentScope.addFunction(nodeMetadata);
    }
  }

});

exports.analyze = function(sourceFile) {
  var morepheus = new Morpheus();
  return morepheus.analyze(sourceFile);
};



