describe("publisher", function() {

  var callback

  beforeEach(function(){
    callback = jasmine.createSpy('subscriber')
  })

  it("should do simple pubsub", function() {
    dub.on('sing', callback)
    dub.emit('sing')
    expect(callback).toHaveBeenCalled()
  })

  it("should pass in the same args", function() {
    dub.on('sing', callback)
    dub.emit('sing', 'some', ['args'], {inn: 'it'})
    expect(callback).toHaveBeenCalledWith('some', ['args'], {inn: 'it'})
  })
  
  it("should set 'this' as the global object if no context is set", function() {
    var x
    dub.on('sing', function(){ x = this })
    dub.emit('sing')
    expect(x).toEqual(window)
  })

  it("should set 'this' as the set context", function() {
    var x
    dub.on('sing', function(){ x = this })
    dub.emit(['sing', 123])
    expect(x).toEqual(123)
  })

  it("should call the callback if subscribed to the correct context", function() {
    dub.on(['sing', 123], callback)
    dub.emit(['sing', 123])
    expect(callback).toHaveBeenCalled()
  })

  it("should not call the callback if subscribed to the incorrect context", function() {
    dub.on(['sing', 1234], callback)
    dub.emit(['sing', 123])
    expect(callback).not.toHaveBeenCalled()
  })

  it("should call the callback if the context is not specified", function() {
    dub.on('sing', callback)
    dub.emit(['sing', 123])
    expect(callback).toHaveBeenCalled()
  })

  describe("subscribing to a class type", function(){
    
    var Blobo, blobo
    
    beforeEach(function(){
      Blobo = Class('Blobo')
      blobo = Blobo.create()
    })
    
    it("should call the callback if the context is of the specified class", function() {
      dub.on(['sing', 'Blobo'], callback)
      dub.emit(['sing', blobo])
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the callback if the context is not of the specified class", function() {
      dub.on(['sing', 'Chargrilled'], callback)
      dub.emit(['sing', blobo])
      expect(callback).not.toHaveBeenCalled()
    })
  
  })

  describe("defining what matches the event context", function(){
    
    var matcher = function(ctx){ return ctx == 5 }
    
    it("should call the subscribed callback if the matcher function is true", function() {
      dub.on(['sing', matcher], callback)
      dub.emit(['sing', 5])
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the subscribed callback if the matcher function is false", function() {
      dub.on(['sing', matcher], callback)
      dub.emit(['sing', 6])
      expect(callback).not.toHaveBeenCalled()
    })
    
  })

});
