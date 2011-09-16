describe("Dub classes", function() {

  describe("simple", function() {
    
    var Car
    
    beforeEach(function(){
      Car = Class('Car', function(){
        this.include({
          colour: 'red'
        })
        
        this.extend({
          jobby: 'dongles'
        })
      })
    })
    
    it("should have a name", function() {
      expect(Car.name).toEqual('Car')
    })

    it("should allow creating", function() {
      var car = Car.create()
    })

    it("should refer the instance to its class", function(){
      var car = Car.create()
      expect(car.klass).toEqual(Car)
    })
    
    it("should allow defining instance vars", function(){
      var car = Car.create()
      expect(car.colour).toEqual('red')
    })

    it("should allow defining class vars", function(){
      var car = Car.create()
      expect(Car.jobby).toEqual('dongles')
    })

  })

});
