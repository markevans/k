dub.publisher = (function(){
  
  var callbacks = {}
  var emptyObject = {}
  
  return {
    emit: function(){
      var event = Array.prototype.shift.apply(arguments)
      var args = arguments
      
      var context
      if(Array.isArray(event)){
        context = event[1]
        event = event[0]
      }

      if(callbacks[event]){
        callbacks[event].forEach(function(c){
          var callback = c[0], subscribedContext = c[1]
          if(subscribedContext == undefined || subscribedContext === context){
            callback.apply((context ? context : emptyObject), args)
          }
        })
      }
    },
    on: function(event, callback){
      var context
      if(Array.isArray(event)){
        context = event[1]
        event = event[0]
      }

      if(!callbacks[event]) callbacks[event] = []
      callbacks[event].push([callback, context])
    }
  }
})()
dub.emit = dub.publisher.emit
dub.on = dub.publisher.on
