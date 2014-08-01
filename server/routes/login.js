var config = require('../config/config');

module.exports = function(app) {
  var auth = require('think-ministry/auth')({
    clientID: config.get('CLIENT_ID'),
    clientSecret: config.get('CLIENT_SECRET'),
    site: config.get('API_URL'),
    authorizationPath: '/oauth/authorize',
    tokenPath: '/oauth/token'
  });

  app.post('/login', function(req, res, next){
    res.type('txt');

    if (req.body.username && req.body.password) {
      auth.getToken(req.body.username, req.body.password).then(function(token) {
        req.login(token, function(error) {
          if (error) {
            return res.status(500).end();
          }

          return res.status(200).send('OK').end();
        });
      }, function(error) {
        return res.status(403).send('Forbidden').end();
      });
    } else {
      return res.status(403).send('Forbidden').end();
    }
  });
};
