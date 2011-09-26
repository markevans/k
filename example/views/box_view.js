dub.view('BoxView', function(){

  this
    .onDOM('.thing', 'mousemove', function(model, evt){ model.set('x', evt.clientX) })

})
