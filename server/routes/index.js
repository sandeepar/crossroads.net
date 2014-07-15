module.exports = function(app) {
  var request = require('superagent');
  var passport = require('passport');
  var moment = require('moment');
  var util = require('util');
  var config = require('../config/config');

  require('./form-mailer')(app);
  require('./ministry_platform')(app);

  var oauth = require('../oauth/index.js');

  passport.serializeUser(function(token, done) {
    if (token.expires_at != null) {
      token.expires_at = moment().add('seconds', token.expires_at);
    }
    return done(null, JSON.stringify(token));
  });

  passport.deserializeUser(function(str, done) {
    return done(null, JSON.parse(str));
  });

  app.post("/login", function(req, res, next) {
    var userToken = oauth.getTokenForUser(req.body.username, req.body.password);
    userToken.then(function(token) {
      req.login(token, function(error) {
        if (error) {
          return res.send(500);
        }
        return res.send(200);
      });
      return true;
    }, function(error) {
      return res.send(403);
    });
  });

  app.delete("/logout", function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.send(204);
  });
};
