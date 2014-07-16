var util = require('util'),
    config = require('../config/config'),
    q = require('q');

var auth = exports;

auth.credentials =  {
  clientID: config.client.id,
  clientSecret: config.client.secret,
  site: config.api.url,
  authorizationPath: '/oauth/authorize',
  tokenPath: '/oauth/token'
};

var OAuth2 = require('simple-oauth2')(auth.credentials);

auth.getToken = function(username, password) {
  var deferred = q.defer();
  OAuth2.Password.getToken({
    username: username,
    password: password
  }, function(error, result) {
    if (error) {
      deferred.reject(error);
      return;
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

auth.wrapToken = function(token) {
  return OAuth2.AccessToken.create(token);
};
