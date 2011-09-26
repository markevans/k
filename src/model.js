dub.Model = dub.Class('Model', function(klass){
  
  this
  
  .onInit(function(attrs){
    this._attributes = attrs || {}
  })

  .include(dub.publishable)

  .include({
    attributes: function(){
      return this._attributes
    },
    get: function(key){
      var customMethod = 'get' + key.upperFirstChar()
      if(this[customMethod]){
        return this[customMethod]() 
      } else {
        return this._getAttr(key)
      }
    },
    set: function(key, value){
      var customMethod = 'set' + key.upperFirstChar()
      if(this[customMethod]){
        this[customMethod](value) 
      } else {
        this._setAttr(key, value)
      }
    },
    _getAttr: function(key){
      return this.attributes()[key]
    },
    _setAttr: function(key, value){
      this.attributes()[key] = value
      this.emit('change', [key, value])
      this.emit('change:'+key, [value])
    }
  })
  
})
dub.model = function(name, definition){
  dub.globalObject[name] = dub.Class(name, dub.Model, definition)
}
