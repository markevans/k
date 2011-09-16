describe("Dub classes", function() {

  describe("simple", function() {
    
    var Car
    
    beforeEach(function(){
      Car = Class('Car', function(klass){
        
        this.include({
          colour: 'red'
        })
        
        this.extend({
          jobby: 'dongles'
        })
        
        klass.eggs = 'EGGS'
        
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
    
    it("should yield itself in the class definition", function(){
      expect(Car.eggs).toEqual('EGGS')
    })
    
    it("should call initialize if there is one", function(){
      var Tree = Class('Tree', function(){
        this.include({
          init: function(thing, stuff){
            this.smell = ['bad', thing, stuff].join(' ')
          }
        })
      })
      var tree = Tree.create('and', 'great')
      expect(tree.smell).toEqual('bad and great')
    })

  })

  it("should allow for no definition function", function(){
    var Blobo = Class('Blobo')
  })

});
