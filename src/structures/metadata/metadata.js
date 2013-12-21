var _ = require("lodash");

/*
 * Base class for defining metadata info
 */
var Metadata = module.exports = function Metadata(node, provider) {
  this.type = "";

  this.initialize(node, provider);
};

_.extend(Metadata.prototype, {
  /*
   * Returns the type
   * @return {String} type
   */
  getType: function() {
    return this.type;
  }
});

