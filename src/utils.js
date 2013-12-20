var _ = require("lodash");

_.extend(exports, {

  isLiteral : function(node) {
    return node.type === "Literal";
  },

  isIdentifier : function(node) {
    return node.type === "Identifier";
  },

  isArray: function(node) {
    return node.type === "ArrayExpression";
  },

  isAnoymousFunction: function(node) {
    return node.type === "FunctionExpression";
  },

  isNewInstance: function(node) {
    return node.type === "NewExpression";
  },

   isObjectDeclaration: function(node) {
    return node.type === "ObjectExpression";
  },

  variableIdentificationsOf : function(node) {

    if(this.isLiteral(node)) {
      return { type: typeof(node.value) };
    }

    if(this.isAnoymousFunction(node)) {
      return { type: "function" };
    }

    if(this.isNewInstance(node) && this.isIdentifier(node.callee)) {
      return { type: node.callee.name };
    }

    if(this.isObjectDeclaration(node)) {
      var self = this;
      var objectWithProperties = { 
        type: "object",
        properties: _.map(node.properties, function(property) {
          var property_identifcation = self.variableIdentificationsOf(property.value);
          property_identifcation.name = property.key.name;

          return property_identifcation;
        })
      };
      return objectWithProperties;
    }

    if(this.isArray(node)) {
      var self = this;


      var identif =  {
        type: "array",
        itemTypes :  _.map(node.elements, function(element, index) {
          var identifcation = self.variableIdentificationsOf(element);
          identifcation.index = index;

          return identifcation;
        })
      };

      return identif;

    }


    return {};
  }

});
