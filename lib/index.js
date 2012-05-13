
exports.after = function( object, methodName, aspectBody ) {

   var originalMethod = object[methodName];

   var aspect = function() {

      var val = originalMethod.apply( arguments.caller, arguments );
      aspectBody( arguments, val );

      return val;
   };

   object[methodName] = aspect;
};
