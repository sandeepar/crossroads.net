module.exports = function(app) {
  var config = require('../config/config');
  var credentials = { clientID: 'client',
                      clientSecret: 'secret',
                      site: config.api.url,
                      authorizationPath: '/oauth/authorize',
                      tokenPath: '/oauth/token' };

  var OAuth2 = require('simple-oauth2')(credentials);

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

};
