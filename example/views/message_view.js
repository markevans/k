k.view('MessageView', function(){
  this

    .onModel('message', 'render')

    .include({
      render: function(model, text){ $(this.elem).html(text) }
    })
})
