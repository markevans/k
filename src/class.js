dub.classes = {}
var Class = function(){
  var name = arguments[0],
      parent, definitionFunction
  
  if(arguments[1] && arguments[1].constructor === Function){
    definitionFunction = arguments[1]
  } else {
    parent = arguments[1]
    definitionFunction = arguments[2]
  }
  
  var onInitCallbacks = []
  
  var klass = dub.classes[name] = {
    name: name,
    definitionFunction: definitionFunction,
    create: function(){
      var args = arguments
      var obj = new dubObject()
      onInitCallbacks.forEach(function(callback){
        callback.apply(obj, args)
      })
      if(obj.init) obj.init.apply(obj, args)
      return obj
    },
    include: function(obj){
      Object.extend(dubObject.prototype, obj)
      return this
    },
    extend: function(obj){
      Object.extend(this, obj)
      return this
    },
    like: function(klass){
      klass.definitionFunction.call(this, this)
      return this
    },
    onInit: function(init){
      onInitCallbacks.push(init)
      return this
    }
  }

  var dubObject = function(){}
  dubObject.prototype = {
    klass: klass
  }
  
  if(parent) klass.like(parent)
  if(definitionFunction) definitionFunction.call(klass, klass)
  
  return klass
}
