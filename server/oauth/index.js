var q = require('q');

var credentials = {
  clientID: 'client',
  clientSecret: 'secret',
  site: 'https://my.crossroads.net/ministryplatform',
  authorizationPath: '/oauth/authorize',
  tokenPath: '/oauth/token'
};
var OAuth2 = require('simple-oauth2')(credentials);

var getTokenForService = function() {
  var deferred = q.defer();
  OAuth2.Password.getToken({
    username: 'form-mailer-service',
    password: 'password'
  }, function(error, result) {
    if (error) {
      deferred.reject(error);
      return;
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

var getTokenForUser = function(username, password) {
  var deferred = q.defer();
  OAuth2.Password.getToken({
    username: username,
    password: password
  }, function(error, result) {
    if (error) {
      deferred.reject(error);
      return;
    }

    token = OAuth2.AccessToken.create(result);
    deferred.resolve(token);

  });
  return deferred.promise;
};

module.exports.getTokenForService = getTokenForService;
module.exports.getTokenForUser = getTokenForUser;
