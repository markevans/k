describe("publishable", function() {

  var Car = Class('Car', function(){
    this.include(dub.publishable)
  })
  var car, callback
  
  beforeEach(function(){
    car = Car.create()
    callback = jasmine.createSpy('subscriber')
  })
  
  it("should publish to the global publisher", function(){
    dub.on('doves', callback)
    car.emit('doves', 4)
    expect(callback).toHaveBeenCalledWith(4)
  })
  
  it("should publish in context of itself", function(){
    dub.on(['doves', car], callback)
    car.emit('doves', 4)
    expect(callback).toHaveBeenCalledWith(4)
  })
  
  it("should look like you're subscribing to it", function(){
    car.on('doves', callback)
    car.emit('doves', 'stink')
    expect(callback).toHaveBeenCalledWith('stink')
  })
  
  it("should give this as itself in the callback", function(){
    var x
    car.on('doves', function(){ x = this })
    car.emit('doves')
    expect(x).toEqual(car)
  })
  
})
