describe("Classes", function() {

  var Car
  
  beforeEach(function(){
    Car = dub.Class('Car', function(klass){
      
      this.include({
        colour: 'red',
        numWheels: 4
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

  it("should refer the instance to its class/constructor", function(){
    var car = Car.create()
    expect(car.constructor).toEqual(Car)
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
    var Tree = dub.Class('Tree', function(){
      this.include({
        init: function(thing, stuff){
          this.smell = ['bad', thing, stuff].join(' ')
        }
      })
    })
    var tree = Tree.create('and', 'great')
    expect(tree.smell).toEqual('bad and great')
  })

  it("should allow for no definition function", function(){
    var Blobo = dub.Class('Blobo')
  })
  
  describe("inheritance", function(){
    
    var Reliant

    beforeEach(function(){
      Reliant = dub.Class('Reliant', Car, function(klass){

        this.include({
          numWheels: 3,
          isItAwesome: 'yes'
        })

        this.extend({
          eggs: 'fried',
          models: ['robin']
        })

      })
    })

    it("should copy instance properties", function(){
      expect(Reliant.create().colour).toEqual('red')
    })
    
    it("should copy class properties", function(){
      expect(Reliant.jobby).toEqual('dongles')
    })

    it("should still have its own instance properties", function(){
      expect(Reliant.create().isItAwesome).toEqual('yes')
    })
    
    it("should still have its own class properties", function(){
      expect(Reliant.models).toEqual(['robin'])
    })
    
    it("should override instance properties", function(){
      expect(Reliant.create().numWheels).toEqual(3)
    })
    
    it("should override class properties", function(){
      expect(Reliant.eggs).toEqual('fried')
    })
    
    it("should allow passing the 'inherit' arg to Class but not the function", function(){
      var Daimler = dub.Class('Daimler', Car)
      expect(Daimler.create().numWheels).toEqual(4)
    })

    it("should dynamically update if stuff is added to its parent", function(){
      var Peugout = dub.Class('Peugout', Car)
      Car.include({dice: 'three'})
      expect(Peugout.create().dice).toEqual('three')
    })
    
  })

  describe("onInit", function(){
    
    beforeEach(function(){
      Car.onInit(function(some, thing){ this.argo = [some, thing] })
    })
    
    it("should call the onInit callback", function(){
      var car = Car.create('dog', 'man')
      expect(car.argo).toEqual(['dog', 'man'])
    })
    
    it("should call all onInit callbacks then init", function(){
      Car.onInit(function(){ this.argo.push('star') })
      Car.include({init: function(){ this.argo.push('yo') }})
      var car = Car.create('dog', 'man')
      expect(car.argo).toEqual(['dog', 'man', 'star', 'yo'])
    })
  })

})