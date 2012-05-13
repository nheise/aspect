var assert = require('assert');

var aspect = require('../lib/index.js');

var check = {
  arg1 : 'arg1',
  arg2 : 'arg2',
  returnValue : 'return Value',
  callOriginal : false,
  callAspect : false 
};

function A() {
   this.methodA = function( arg1, arg2 ) {
      assert.equal( check.arg1, arg1, 'arg1 in original method' );
      assert.equal( check.arg2, arg2, 'arg2 in original method' );
      assert.ok( !check.callOriginal, 'original was not invoked' );
      assert.ok( !check.callAspect, 'aspect was not invoked' );
      check.callOriginal = true;
      return check.returnValue;
   };
}

var a = new A();

aspect.after( a, "methodA", function( args, returnValue ) {
   assert.equal( args.length, 2 );
   assert.equal( check.arg1, args[0], 'arg1 in aspect  method' );
   assert.equal( check.arg2, args[1], 'arg2 in aspect  method' );
   assert.ok( check.callOriginal, 'original was invoked' );
   assert.ok( !check.callAspect, 'aspect was not invoked' );
   assert.equal( check.returnValue, returnValue, 'return value in aspect must equal' );
   check.callAspect = true;
} );

assert.equal( check.returnValue, a.methodA( 'arg1', 'arg2' ), 'original return value must equal' );
assert.ok( check.callOriginal, 'original was invoked' );
assert.ok( check.callAspect, 'aspect was invoked' );
console.log('aspectAfterTest sucessfull.');
