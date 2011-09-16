dub.publisher = (function(){
  
  function contextMatches(matcher, context){
    if(!matcher) return true
    if(matcher.constructor === Function) return matcher(context)
    if(matcher === context) return true
    if(context.klass && matcher == context.klass.name) return true
    return false
  }
  
  var callbacks = {}
  
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
          var callback = c[0], matcher = c[1]
          if(contextMatches(matcher, context)){
            callback.apply(context, args)
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
