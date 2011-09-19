dub.publishable = {
  on: function(event, callback){
    dub.on(event, callback, this)
  },
  emit: function(event, args){
    dub.emit(event, args, this)
  }
}