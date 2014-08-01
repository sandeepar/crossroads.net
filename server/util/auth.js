var util = require('util'),
    config = require('../config'),
    q = require('q');

var auth = exports;

auth.credentials =  {
  clientID: config.get('CLIENT_ID'),
  clientSecret: config.get('CLIENT_SECRET'),
  site: config.get('API_URL'),
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
