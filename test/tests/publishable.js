describe("publishable", function() {

  var Car = k.Class('Car', function(){
    this.include(k.publishable)
  })
  var car, callback
  
  beforeEach(function(){
    car = Car.create()
    callback = jasmine.createSpy('subscriber')
  })
  
  it("should publish to the global publisher", function(){
    k.on('doves', callback)
    car.emit('doves', 4)
    expect(callback).toHaveBeenCalledWith(car, 4)
  })
  
  it("should publish in context of itself", function(){
    k.on('doves', callback, car)
    car.emit('doves', 4)
    expect(callback).toHaveBeenCalledWith(car, 4)
  })
  
  it("should look like you're subscribing to it", function(){
    car.on('doves', callback)
    car.emit('doves', 'stink')
    expect(callback).toHaveBeenCalledWith(car, 'stink')
  })
  
})
