module.exports = function(app) {
  var config = require('../config/config'),
      auth = require('../util/auth');

  app.post("/login", function(req, res, next){
    if (req.body.username && req.body.password) {
      auth.getToken(req.body.username, req.body.password)
	.then(function(token) {
	  req.login(auth.wrapToken(token), function(error) {
            if(error) {
              return res.send(500);
            }
            return res.send(200);
	  });
	}, function(error) {
	  return res.send(403);
	});
    } else {
      return res.send(403);
    }
  });
};
