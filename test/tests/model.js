describe("models", function() {

  it("should allow init without args", function(){
    var model = dub.Model.create()
    expect(model.get('gum')).toEqual(undefined)
  })
  
  it("should allow init with an args hash", function(){
    var model = dub.Model.create({gum: 'tree'})
    expect(model.get('gum')).toEqual('tree')
  })

  it("should allow setting an attribute", function(){
    var model = dub.Model.create()
    model.set('gum', 'drops')
    expect(model.get('gum')).toEqual('drops')
  })

  it("should call custom setBlah if it exists", function(){
    var model = dub.Model.create()
    model._setEggNog = function(num){ this.setAttr('eggNog', num * 15) }
    model.set('eggNog', 5)
    expect(model.get('eggNog')).toEqual(75)
  })

  it("should call custom getBlah if it exists", function(){
    var model = dub.Model.create()
    model._getEggNog = function(){ return this.getAttr('eggNog').toUpperCase() }
    model.set('eggNog', 'weasels')
    expect(model.get('eggNog')).toEqual('WEASELS')
  })

  it("should be publishable", function(){
    var callback = jasmine.createSpy('callback')
    var model = dub.Model.create()
    model.on('split', callback)
    model.emit('split')
    expect(callback).toHaveBeenCalled()
  })
  
  it("should publish a change event on change", function(){
    var callback = jasmine.createSpy('callback')
    var model = dub.Model.create()
    model.on('change', callback)
    model.set('banana', 'co')
    expect(callback).toHaveBeenCalledWith(model, 'banana', 'co')
  })

  it("should publish a change:blah event on change", function(){
    var callback = jasmine.createSpy('callback')
    var model = dub.Model.create()
    model.on('change:banana', callback)
    model.set('banana', 'co')
    expect(callback).toHaveBeenCalledWith(model, 'co')
  })

})
