
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
