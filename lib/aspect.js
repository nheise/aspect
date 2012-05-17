
exports.after = function( object, methodName, aspectBody ) {

   var originalMethod = object[methodName];

   var aspect = function() {

      var val = originalMethod.apply( arguments.caller, arguments );
      aspectBody( arguments, val );

      return val;
   };

   object[methodName] = aspect;
};

exports.before = function( object, methodName, aspectBody ) {

   var originalMethod = object[methodName];

   var aspect = function() {
      aspectBody( arguments );
      return originalMethod.apply( arguments.caller, arguments );
   };

   object[methodName] = aspect;
};

exports.aroundInvoke = function( object, methodName, aspectBodies ) {
   var aspectBefore = aspectBodies.before || function(){};
   var aspectAfter = aspectBodies.after || function(){};

   var originalMethod = object[methodName];

   var aspect = function() {
      aspectBefore( arguments );
      var val =  originalMethod.apply( arguments.caller, arguments );
      aspectAfter( arguments, val );
      return val;
   };

   object[methodName] = aspect;
};
