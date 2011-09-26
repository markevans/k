dub.classes = {}

dub.BaseClass = function(){}
Object.extend(dub.BaseClass, {
  madeByDub: true,
  create: function(){
    var args = arguments
    var obj = new this()
    obj.constructor = this
    this.onInitCallbacks.forEach(function(callback){
      callback.apply(obj, args)
    })
    if(obj.init) obj.init.apply(obj, args)
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
  onInit: function(init){
    this.onInitCallbacks.push(init)
    return this
  }
})

dub.Class = function(){
  
  // Sort out the arguments:
  // Class('ClassName', parent=dub.BaseClass, definitionFunction=null)
  var name = arguments[0],
      parent, definitionFunction

  if(arguments[1] && arguments[1].madeByDub){
    parent = arguments[1]
    definitionFunction = arguments[2]
  } else {
    parent = dub.BaseClass
    definitionFunction = arguments[1]
  }

  // Create the class
  eval("var klass = function " + name + "(){}")
  klass.prototype = new parent()
  Object.extend(klass, parent)
  klass.onInitCallbacks = parent.onInitCallbacks || []

  // Store a reference for reflection purposes
  dub.classes[name] = klass

  if(definitionFunction) definitionFunction.call(klass, klass)

  return klass
}
