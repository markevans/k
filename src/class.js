var Class = function(name, definitionFunction){
  
  var klass = {
    name: name,
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
    }
  }

  var konstructor = function(){}
  konstructor.prototype = {
    klass: klass
  }
  
  definitionFunction.call(klass, klass)
  
  return klass
}
