var _ = require("lodash"),
   util = require("util"),
   Metadata = require("./metadata");


/*
 * Metadata for array
 *
 * @base {Metadata}
 */
var ArrayMetadata = module.exports = function ArrayMetadata(node, provider) {
  this.itemTypes = [];

  Metadata.call(this, node, provider);
};

util.inherits(ArrayMetadata, Metadata);

_.extend(ArrayMetadata.prototype, {
  /*
   * Get the types of the elements in the array
   * @params {Node} esprima node
   * @params {MetadataProvider} metadata provider
   */
  initialize: function(node, provider) {
    this.type = "array";

    _.each(node.elements, _.bind(function(element, index) {
      var typeMetadata = provider.provide(element);
      typeMetadata.index = index;

      this.itemTypes.push(typeMetadata);
    }, this));
  }
});


