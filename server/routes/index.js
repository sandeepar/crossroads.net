module.exports = function(app) {
  var request = require('superagent');
  var passport = require('passport');
  var moment = require('moment');
  var util = require('util');
  var config = require('../config/config');

  require('./form-mailer')(app);
  require('./register')(app);

  var credentials = { clientID: 'client',
                      clientSecret: 'secret',
                      site: config.api.url,
                      authorizationPath: '/oauth/authorize',
                      tokenPath: '/oauth/token' };

  var OAuth2 = require('simple-oauth2')(credentials);

  passport.serializeUser(function(token, done) {
    if (token.expires_at != null) {
      token.expires_at = moment().add('seconds', token.expires_at);
    }
    return done(null, JSON.stringify(token));
  });

  passport.deserializeUser(function(str, done) {
    return done(null, JSON.parse(str));
  });

  app.post("/login", function(req, res, next){
    var token = OAuth2.Password.getToken({
      username: req.body.username,
      password: req.body.password
    }, saveToken);

    function saveToken(error, result) {
      if (error) {
        return res.send(403);
      }
      token = OAuth2.AccessToken.create(result);
      req.login(token, function(error) {
        if(error) {
          return res.send(500);
        }
        return res.send(200);
      });
      return true;
    };
  });

  app.delete("/logout", function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.send(204);
  });
};
