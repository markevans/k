dub.classes = {}
var Class = function(name, definitionFunction){
  
  var klass = dub.classes[name] = {
    name: name,
    definitionFunction: definitionFunction,
    create: function(){
      var obj = new dubObject()
      if(obj.init) obj.init.apply(obj, arguments)
      return obj
    },
    include: function(obj){
      Object.extend(dubObject.prototype, obj)
    },
    extend: function(obj){
      Object.extend(this, obj)
    },
    like: function(klass){
      klass.definitionFunction.call(this, this)
    }
  }

  var dubObject = function(){}
  dubObject.prototype = {
    klass: klass
  }
  
  if(definitionFunction) definitionFunction.call(klass, klass)
  
  return klass
}
