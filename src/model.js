k.Model = k.Class('Model', function(klass){
  
  this
  
  .beforeInit(function(attrs){
    this._attributes = attrs || {}
  })
  
  .afterInit(function(){
    this.emit('created')
  })

  .include(k.publishable)

  .include({
    attributes: function(){
      return this._attributes
    },
    get: function(key){
      var customMethod = '_get' + key.upperFirstChar()
      if(this[customMethod]){
        return this[customMethod]() 
      } else {
        return this.getAttr(key)
      }
    },
    set: function(key, value){
      var customMethod = '_set' + key.upperFirstChar()
      if(this[customMethod]){
        this[customMethod](value) 
      } else {
        this.setAttr(key, value)
      }
    },
    getAttr: function(key){
      return this.attributes()[key]
    },
    setAttr: function(key, value){
      this.attributes()[key] = value
      this.emit('change', [key, value])
      this.emit('change:'+key, [value])
    },
    toString: function(){
      return this.constructor.name
    }
  })
  
})
k.model = function(name, definition){
  k.globalObject[name] = k.Class(name, k.Model, definition)
}
