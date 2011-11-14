k.classes = {}

k.BaseClass = function(){}
Object.extend(k.BaseClass, {
  madeByDub: true,
  create: function(){
    var args = arguments
    var obj = new this()
    obj.constructor = this
    this.beforeInitCallbacks.forEach(function(callback){ callback.apply(obj, args) })
    if(obj.init) obj.init.apply(obj, args)
    this.afterInitCallbacks.forEach(function(callback){ callback.apply(obj, args) })
    return obj
  },
  include: function(obj){
    Object.extend(this.prototype, obj)
    return this
  },
  extend: function(obj){
    Object.extend(this, obj)
    return this
  },
  beforeInit: function(init){
    this.beforeInitCallbacks.push(init)
    return this
  },
  afterInit: function(init){
    this.afterInitCallbacks.push(init)
    return this
  }
})

k.Class = function(){
  
  // Sort out the arguments:
  // Class('ClassName', parent=k.BaseClass, definitionFunction=null)
  var name = arguments[0],
      parent, definitionFunction

  if(arguments[1] && arguments[1].madeByDub){
    parent = arguments[1]
    definitionFunction = arguments[2]
  } else {
    parent = k.BaseClass
    definitionFunction = arguments[1]
  }

  // Create the class
  eval("var klass = function " + name + "(){}")
  klass.prototype = new parent()
  Object.extend(klass, parent)
  klass.beforeInitCallbacks = parent.beforeInitCallbacks || []
  klass.afterInitCallbacks  = parent.afterInitCallbacks  || []

  // Store a reference for reflection purposes
  k.classes[name] = klass

  if(definitionFunction) definitionFunction.call(klass, klass)

  return klass
}
