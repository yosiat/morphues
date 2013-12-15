var _ = require("lodash");

_.extend(exports, {

  isLiteral : function(node) {
    return node.type === "Literal";
  },

  isArray: function(node) {
    return node.type === "ArrayExpression";
  },

  isAnoymousFunction: function(node) {
    return node.type === "FunctionExpression";
  },

  variableIdentificationsOf : function(node) {

    if(this.isLiteral(node)) {
      return { type: typeof(node.value) };
    }


    if(this.isAnoymousFunction(node)) {
      return { type: "function" };
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


  }

});
