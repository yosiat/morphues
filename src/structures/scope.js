var _ = require("lodash");

// TODO:
// Refactor this class, we too much code duplication
// when adding variable/function and retreiving it's metadata


var Scope = module.exports = function Scope() {
  this.variables = [];
  this.functions = [];


  // Index for variables and functions retrieval by their name
  this._variableIndex = {};
  this._functionIndex = {};
};

function mergeObjectProperties(newItem,oldItems){
  var result = oldItems;
  var indexOfProperty = oldItems.length;
  //look if the property is on old items. if yes update the indexOfProperty
  for (var i = oldItems.length - 1; i >= 0; i--) {
   
   if (oldItems[i].name === newItem.name) {
        //there is 
        indexOfProperty = i;
        break;
    }

  }
  result[indexOfProperty] = newItem;
  return result;
  }

  _.extend(Scope.prototype, {

  /*
   * Add variable to the current scope
   * @param {Metadata} metadata about the variable
   */
   addOrUpdateVariable: function(metadata) {
    var index = this._variableIndex[metadata.name];
    if (metadata.name.indexOf(".") != -1) {
      var varName = metadata.name.substring(0,metadata.name.indexOf("."));
      var propertyName = metadata.name.substring(metadata.name.indexOf(".")+1,metadata.name.length);
      var property = {name: propertyName , type: metadata.type};
      index = this._variableIndex[varName];
      //todo: what to do if there is no such index
       oldMetaData =  this.variables[index];
        var mergedProperties = mergeObjectProperties(property,
          oldMetaData.properties);
        this.variables[index].properties = mergedProperties;
      return;
    }
    if( index != undefined){
      this.variables[index] = metadata;
    } 
    else {
      var returnIndex = this.variables.push(metadata);
      this._variableIndex[metadata.name] = returnIndex - 1;
    }
  },

  /*
   * Add function to the current scope
   * @param {FunctionMetadata} function metadata
   */
   addFunction: function(metadata) {
    var returnIndex = this.functions.push(metadata);
    this._functionIndex[metadata.name] = returnIndex - 1;
  },
  

  /*
   * Returns variable metadata by it's name
   * @param  {String} variable name
   * @return {Metadata} variable metadata
   */
   getVariableMetadata: function(name) {
    if(_.has(this._variableIndex, name)) {
      var variableIndex = this._variableIndex[name];
      return this.variables[variableIndex];
    }

    return null;
  },

  /*
   * Returns function metadata by it's name
   * @param  {String} function name
   * @return {FunctionMetadata} function metadata
   */
   getFunctionMetadata: function(name) {
    if(_.has(this._functionIndex, name)) {
      var functionIndex = this._functionIndex[name];
      return this.functions[functionIndex];
    }

    return null;

  },
});



