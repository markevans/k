k.View = k.Class('View', function(klass){
  
  this

    .beforeInit(function(el, model){
      var self = this
      this.elem = this._elemFor(el)
      this.model = model
      
      this.constructor.onDOMSubscriptions.forEach(function(sub){
        self._delegate(sub.selector, sub.event, function(){
          sub.callback.apply(self, [model].concat(Array.prototype.slice.call(arguments)))
        })
      })
      
      this.constructor.onModelSubscriptions.forEach(function(sub){
        model.on(sub.event, function(){
          self[sub.method].apply(self, arguments)
        })
      })

    })
  
    .include({
      _elemFor: function(el){
        return jQuery(el)[0]
      },
      _delegate: function(selector, event, callback){
        jQuery(this.elem).delegate(selector, event, function(){
          callback.apply(this, arguments)
          return false
        })
      }
    })
  
    .extend({
      
      onModelSubscriptions: [],
      
      onModel: function(event, method){
        this.onModelSubscriptions.push({
          event: event,
          method: method
        })
        return this
      },
      
      onDOMSubscriptions: [],

      onDOM: function(selector, event, callback){
        this.onDOMSubscriptions.push({
          event: event,
          selector: selector,
          callback: callback
        })
        return this
      }
      
    })
  
})
k.view = function(name, definition){
  k.globalObject[name] = k.Class(name, k.View, definition)
}
