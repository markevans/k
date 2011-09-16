beforeEach(function() {
  this.addMatchers({
    toBeBlah: function(expected) {
      return this.actual === expected
    }
  });
});
