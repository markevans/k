describe("Dub", function() {

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
  
  it("should set 'this' as an empty object if no context is set", function() {
    var x
    dub.on('sing', function(){ x = this })
    dub.emit('sing')
    expect(x).toEqual({})
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

});
