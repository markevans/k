dub.View = dub.Class('View', function(klass){
  
  this

    .onInit(function(el, model){
      var self = this
      this.elem = this._elemFor(el)
      this.model = model
      
      this.constructor.onDOMSubscriptions.forEach(function(sub){
        self._delegate(sub.selector, sub.event, function(){
          var args
          if(sub.argsMap){
            args = sub.argsMap.apply(sub, arguments)
            if(!Array.isArray(args)) args = [args]
          } else {
            args = arguments
          }
          model[sub.method].apply(model, args)
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
        jQuery(this.elem).delegate(selector, event, callback)
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

      onDOM: function(selector, event, method, argsMap){
        this.onDOMSubscriptions.push({
          event: event,
          selector: selector,
          method: method,
          argsMap: argsMap
        })
        return this
      }
      
    })
  
})