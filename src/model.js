var Model = Class('Model', function(klass){
  
  this.include({
    init: function(attrs){
      if(attrs){
        this._attributes = attrs
      }
    },
    attributes: function(){
      if(!this._attributes) this._attributes = {}
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
    }
  })
  
})
