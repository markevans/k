var Class = function(name, definitionFunction){
  
  var klass = {
    name: name,
    create: function(){
      return new konstructor()
    },
    include: function(obj){
      Object.extend(konstructor.prototype, obj)
    },
    extend: function(obj){
      Object.extend(this, obj)
    }
  }

  var konstructor = function(){}
  konstructor.prototype = {
    klass: klass
  }
  
  definitionFunction.call(klass, klass)
  
  return klass
}
