(function($){

  function appendDivToBody(){
    return $('<div>')
      .attr({id: 'test-div'})
      .append(
        $('<div>').addClass('inner')
      )
      .appendTo($('body'))
  }

  describe("views", function(){
  
    var model, $div
  
    beforeEach(function(){
      model = k.Model.create()
      $div = appendDivToBody()
    })
  
    it("should allow initalizing with a selector", function(){
      var view = k.View.create('#test-div')
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should allow initalizing with a DOM element", function(){
      var view = k.View.create($('#test-div')[0])
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should allow initalizing with a jQuery element", function(){
      var view = k.View.create($('#test-div'))
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should bind to model events", function(){
      var render = jasmine.createSpy('render')
      k.View.onModel('sneeze', 'render')
          .include({render: render})
      var view = k.View.create('#test-div', model)
      model.emit('sneeze', [7])
      expect(render).toHaveBeenCalledWith(model, 7)
    })  

    it("should bind to DOM events", function(){
      model.fart = jasmine.createSpy('fart')
      k.View.onDOM('.inner', 'click', function(model, evt){ model.fart(evt.type, 'beetle') })
      var view = k.View.create('#test-div', model)
      $('#test-div .inner').click()
      expect(model.fart).toHaveBeenCalledWith('click', 'beetle')
    })
    
  })
  
})(jQuery)