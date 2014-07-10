module.exports = function(app) {
  var getTokenForService = function() {
    console.log ('getTokenForService - oauth')
      var deferred = q.defer();
      OAuth2.Password.getToken({
              username: 'form-mailer-service',
              password: 'password'
          }, function(error, result) {
          if (error) {
              console.log('OAuth error: ' + util.inspect(error));
              deferred.reject(error);
              return;
          }

          //console.log('Access token: ' + util.inspect(result));
          deferred.resolve(result);
      });

      return deferred.promise;
  };
};
