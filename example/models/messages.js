dub.model('Messages', function(){
  this.
    include({
      message: function(text){
        this.emit('message', [text])
      }
    })
})
