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
    model.setEggNog = function(num){ this._setAttr('eggNog', num * 15) }
    model.set('eggNog', 5)
    expect(model.get('eggNog')).toEqual(75)
  })

  it("should call custom getBlah if it exists", function(){
    var model = dub.Model.create()
    model.getEggNog = function(){ return this._getAttr('eggNog').toUpperCase() }
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

})
