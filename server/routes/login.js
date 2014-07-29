module.exports = function(app) {
  var config = require('../config/config'),
      auth = require('../util/auth');

  app.post("/login", function(req, res, next){
    res.type('txt');

    if (req.body.username && req.body.password) {
      auth.getToken(req.body.username, req.body.password).then(function(token) {
        req.login(auth.wrapToken(token), function(error) {
          if(error) {
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
