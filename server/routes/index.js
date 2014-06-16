var request = require('superagent');
var passport = require('passport');
var moment = require('moment');
var util = require('util');
var credentials = { clientID: 'client',
                             clientSecret: 'secret',
                             site: 'https://my.crossroads.net/ministryplatform',
                             authorizationPath: '/oauth/authorize',
                             tokenPath: '/oauth/token' };

var OAuth2 = require('simple-oauth2')(credentials);

passport.serializeUser(function(token, done) {
  if (token.expires_in != null) {
    token.expires_at = moment().add('seconds', token.expires_in);
  }
  return done(null, JSON.stringify(token));
});

passport.deserializeUser(function(str, done) {
  return done(null, JSON.parse(str));
});

module.exports = function(app) {
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
        };
    });

    app.delete("/logout", function(req, res, next) {
        req.logout();
        req.session.destroy();
        req.send(204);
    });
};
