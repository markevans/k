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

  it("should set the sender as null if not set", function() {
    var x = 'dummy'
    dub.on('sing', function(sender){ x = sender })
    dub.emit('sing')
    expect(x).toEqual(null)
  })

  it("should pass on the args", function() {
    dub.on('sing', callback)
    dub.emit('sing', ['some', ['args'], {inn: 'it'}])
    expect(callback).toHaveBeenCalledWith(undefined, 'some', ['args'], {inn: 'it'})
  })
  
  it("should set the sender", function() {
    var x
    dub.on('sing', function(sender){ x = sender })
    dub.emit('sing', [], 123)
    expect(x).toEqual(123)
  })

  it("should call the callback if subscribed to the correct sender", function() {
    dub.on('sing', callback, 123)
    dub.emit('sing', [], 123)
    expect(callback).toHaveBeenCalled()
  })

  it("should not call the callback if subscribed to the incorrect sender", function() {
    dub.on('sing', callback, 1234)
    dub.emit('sing', [], 123)
    expect(callback).not.toHaveBeenCalled()
  })

  it("should call the callback if the sender is not specified", function() {
    dub.on('sing', callback)
    dub.emit('sing', [], 123)
    expect(callback).toHaveBeenCalled()
  })

  describe("subscribing to a class type", function(){
    
    var Blobo, blobo
    
    beforeEach(function(){
      Blobo = dub.Class('Blobo')
      blobo = Blobo.create()
    })
    
    it("should call the callback if the sender is of the specified class", function() {
      dub.on('sing', callback, 'Blobo')
      dub.emit('sing', [], blobo)
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the callback if the sender is not of the specified class", function() {
      dub.on('sing', callback, 'Chargrilled')
      dub.emit('sing', [], blobo)
      expect(callback).not.toHaveBeenCalled()
    })
  
  })

  describe("defining what matches the sender", function(){
    
    var matcher = function(ctx){ return ctx == 5 }
    
    it("should call the subscribed callback if the matcher function is true", function() {
      dub.on('sing', callback, matcher)
      dub.emit('sing', [], 5)
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the subscribed callback if the matcher function is false", function() {
      dub.on('sing', callback, matcher)
      dub.emit('sing', [], 6)
      expect(callback).not.toHaveBeenCalled()
    })
    
  })

});
