var _ = require("lodash"),
   util = require("util"),
   Metadata = require("./metadata");


/*
 * Metadata for object
 *
 * @base {Metadata}
 */
var ObjectMetadata = module.exports = function ObjectMetadata(node, provider) {
  this.properties = [];

  Metadata.call(this, node, provider);
};

util.inherits(ObjectMetadata, Metadata);

_.extend(ObjectMetadata.prototype, {
  /*
   * Get the type of each object properties
   * @params {Node} esprima node
   * @params {MetadataProvider} metadata provider
   */
  initialize: function(node, provider) {
    this.type = "object";

    _.each(node.properties, _.bind(function(property){
      var propertyMetadata = provider.provide(property.value);
      propertyMetadata.name = property.key.name;

      this.properties.push(propertyMetadata);
    }, this));
  }

});

