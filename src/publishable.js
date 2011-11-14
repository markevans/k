k.publishable = {
  on: function(event, callback){
    k.on(event, callback, this)
  },
  emit: function(event, args){
    k.emit(event, args, this)
  }
}