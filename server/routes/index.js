request = require('superagent')

module.exports = function(app) {
    app.post("/login", function(req, res, next){
        var email, password;
        username = req.body.username;
        password = req.body.password;
        return request.post("https://my.crossroads.net/ministryplatform/oauth/token").set('Accept', 'application/json').send({
            username: username,
            password: password,
            client_id: 'client',
            client_secret: 'secret',
            grant_type: "password"
        }).end(function(err, response) {
            var auth;
             if (err) {
                return next(err);
            }
            if (response.status === 200) {
                auth = {
                    access_token: response.body.access_token,
                    refresh_token: response.body.refresh_token,
                    expires_in: response.body.expires_in,
                    token_type: response.body.token_type,
                    scope: response.body.scope
                };
                return req.login(auth, function(err) {
                    debug(err);
                    if (err) {
                        return next(err);
                    }
                    return res.send(200);
                });
            } else {
                return res.send(response.status, response.body);
            }
      });
  });
};
