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
      model = dub.Model.create()
      $div = appendDivToBody()
    })
  
    it("should allow initalizing with a selector", function(){
      var view = dub.View.create('#test-div')
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should allow initalizing with a DOM element", function(){
      var view = dub.View.create($('#test-div')[0])
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should allow initalizing with a jQuery element", function(){
      var view = dub.View.create($('#test-div'))
      expect(view.elem.id).toEqual('test-div')
    })
  
    it("should bind to model events", function(){
      var render = jasmine.createSpy('render')
      dub.View.onModel('sneeze', 'render')
          .include({render: render})
      var view = dub.View.create('#test-div', model)
      model.emit('sneeze', [7])
      expect(render).toHaveBeenCalledWith(model, 7)
    })  

    it("should bind to DOM events", function(){
      model.fart = jasmine.createSpy('fart')
      dub.View.onDOM('.inner', 'click', 'fart')
      var view = dub.View.create('#test-div', model)
      $('#test-div .inner').click()
      expect(model.fart).toHaveBeenCalled()
    })

    it("should allow mapping the args", function(){
      model.fart = jasmine.createSpy('fart')
      dub.View.onDOM('.inner', 'click', 'fart', function(evt){ return [evt.type, 'beetle'] })
      var view = dub.View.create('#test-div', model)
      $('#test-div .inner').click()
      expect(model.fart).toHaveBeenCalledWith('click', 'beetle')
    })
    
    it("should allow returning a non-array for the args mapper", function(){
      model.fart = jasmine.createSpy('fart')
      dub.View.onDOM('.inner', 'click', 'fart', function(evt){ return evt.type + 'beetle' })
      var view = dub.View.create('#test-div', model)
      $('#test-div .inner').click()
      expect(model.fart).toHaveBeenCalledWith('clickbeetle')
    })
  
  })
  
})(jQuery)