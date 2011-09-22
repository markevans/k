var Class = function(name, definitionFunction){
  
  var klass = {
    name: name,
    definitionFunction: definitionFunction,
    create: function(){
      var obj = new konstructor()
      if(obj.init) obj.init.apply(obj, arguments)
      return obj
    },
    include: function(obj){
      Object.extend(konstructor.prototype, obj)
    },
    extend: function(obj){
      Object.extend(this, obj)
    },
    like: function(klass){
      klass.definitionFunction.call(this, this)
    }
  }

  var konstructor = function(){}
  konstructor.prototype = {
    klass: klass
  }
  
  if(definitionFunction) definitionFunction.call(klass, klass)
  
  return klass
}
