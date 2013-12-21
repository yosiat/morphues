var _ = require("lodash"),
   util = require("util"),
   Metadata = require("./metadata");

/*
 * Metadata for instance variables, like:
 *  var myInstance = new DummyClass();
 *
 * @base {Metadata}
 */
var InstanceMetadata = module.exports = function InstanceMetadata(node, provider) {
  Metadata.call(this, node, provider);
};

util.inherits(InstanceMetadata, Metadata);

_.extend(InstanceMetadata.prototype, {
  /*
   * Get the types of the primitive from the node value
   * @params {Node} esprima node
   */
  initialize : function(node) {
    // If the one who called is an Identifier
    if(node.callee.type === "Identifier") {
      this.type = node.callee.name;
    }
  }
});

