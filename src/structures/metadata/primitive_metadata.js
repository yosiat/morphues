var _ = require("lodash"),
   util = require("util"),
   Metadata = require("./metadata");

/*
 * Metadata for the primitive types like integer, string
 *
 * @base {Metadata}
 */
var PrimitiveMetadata = module.exports = function PrimitiveMetadata(node, provider) {
  Metadata.call(this, node, provider);
};

util.inherits(PrimitiveMetadata, Metadata);

_.extend(PrimitiveMetadata.prototype, {
  /*
   * Get the types of the primitive from the node value
   * @params {Node} esprima node
   */
  initialize : function(node) {
    this.type = typeof(node.value);
  }
});

