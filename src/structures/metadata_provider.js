var _ = require("lodash");

function MetadataProvider() {
  this._metadataRegistry = {};
}


_.extend(MetadataProvider.prototype, {
  /*
   * Registers a new metadata class by node type
   * @param {String} node type - Literal, ArrayExpression, etc.
   * @param {Function} metadataClass - the metadata class constructor
   */
  registerMetadata : function(nodeType, metadataClass) {
    this._metadataRegistry[nodeType] = metadataClass;
  },
  /*
   * Gets an esprima node and returns the relevant the metadata
   * @param  {Node} esprima node
   * @return {Metadata} metadata
   */
  provide : function(node) {
    if(!_.has(this._metadataRegistry, node.type)) {
      return {};
    }

    var MetadataClass = this._metadataRegistry[node.type];
    var instance = new MetadataClass(node, this);

    return instance;
  }

});

module.exports.getMetadataProvider = function() {
  var metadataProvider = new MetadataProvider();

  // Register all the metadata providers
  metadataProvider.registerMetadata("Literal", require("./metadata/primitive_metadata"));
  metadataProvider.registerMetadata("ArrayExpression", require("./metadata/array_metadata"));
  metadataProvider.registerMetadata("ObjectExpression", require("./metadata/object_metadata"));
  metadataProvider.registerMetadata("FunctionExpression", require("./metadata/function_metadata"));
  metadataProvider.registerMetadata("FunctionDeclaration", require("./metadata/function_metadata"));
  metadataProvider.registerMetadata("NewExpression", require("./metadata/instance_metadata"));

  return metadataProvider;
};
