describe("publisher", function() {

  var callback

  beforeEach(function(){
    callback = jasmine.createSpy('subscriber')
  })

  it("should do simple pubsub", function() {
    k.on('sing', callback)
    k.emit('sing')
    expect(callback).toHaveBeenCalled()
  })

  it("should set the sender as null if not set", function() {
    var x = 'dummy'
    k.on('sing', function(sender){ x = sender })
    k.emit('sing')
    expect(x).toEqual(null)
  })

  it("should pass on the args", function() {
    k.on('sing', callback)
    k.emit('sing', ['some', ['args'], {inn: 'it'}])
    expect(callback).toHaveBeenCalledWith(undefined, 'some', ['args'], {inn: 'it'})
  })
  
  it("should set the sender", function() {
    var x
    k.on('sing', function(sender){ x = sender })
    k.emit('sing', [], 123)
    expect(x).toEqual(123)
  })

  it("should call the callback if subscribed to the correct sender", function() {
    k.on('sing', callback, 123)
    k.emit('sing', [], 123)
    expect(callback).toHaveBeenCalled()
  })

  it("should not call the callback if subscribed to the incorrect sender", function() {
    k.on('sing', callback, 1234)
    k.emit('sing', [], 123)
    expect(callback).not.toHaveBeenCalled()
  })

  it("should call the callback if the sender is not specified", function() {
    k.on('sing', callback)
    k.emit('sing', [], 123)
    expect(callback).toHaveBeenCalled()
  })

  describe("subscribing to a class type", function(){
    
    var Blobo, blobo
    
    beforeEach(function(){
      Blobo = k.Class('Blobo')
      blobo = Blobo.create()
    })
    
    it("should call the callback if the sender is of the specified class", function() {
      k.on('sing', callback, 'Blobo')
      k.emit('sing', [], blobo)
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the callback if the sender is not of the specified class", function() {
      k.on('sing', callback, 'Chargrilled')
      k.emit('sing', [], blobo)
      expect(callback).not.toHaveBeenCalled()
    })
  
  })

  describe("defining what matches the sender", function(){
    
    var matcher = function(ctx){ return ctx == 5 }
    
    it("should call the subscribed callback if the matcher function is true", function() {
      k.on('sing', callback, matcher)
      k.emit('sing', [], 5)
      expect(callback).toHaveBeenCalled()
    })

    it("should not call the subscribed callback if the matcher function is false", function() {
      k.on('sing', callback, matcher)
      k.emit('sing', [], 6)
      expect(callback).not.toHaveBeenCalled()
    })
    
  })

});
