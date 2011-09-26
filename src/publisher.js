dub.publisher = (function(){
  
  function senderMatches(matcher, sender){
    if(!matcher) return true
    if(matcher.constructor === Function) return matcher(sender)
    if(matcher === sender) return true
    if(matcher == sender.constructor.name) return true
    return false
  }
  
  var callbacks = {}
  
  return {
    emit: function(event, args, sender){
      if(callbacks[event]){
        callbacks[event].forEach(function(c){
          var callback = c[0], matcher = c[1]
          if(senderMatches(matcher, sender)){
            callback.apply(this, [sender].concat(args))
          }
        })
      }
    },
    on: function(event, callback, matcher){
      if(!callbacks[event]) callbacks[event] = []
      callbacks[event].push([callback, matcher])
    }
  }
})()
dub.emit = dub.publisher.emit
dub.on = dub.publisher.on
