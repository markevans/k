dub.publishable = {
  on: function(event, callback){
    dub.on([event, this], callback)
  },
  emit: function(){
    var event = Array.prototype.shift.apply(arguments)
    var args = Array.prototype.slice.apply(arguments)
    dub.emit.apply(dub, [[event, this]].concat(args))
  }
}