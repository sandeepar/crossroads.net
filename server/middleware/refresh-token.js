var config, moment, request;

moment = require('moment');
request = require('superagent');

module.exports = function() {
  return function(req, res, next) {
    if ((req.user != null) && (req.user.token.expires_at != null) && moment().add('seconds', 30).isAfter(moment(req.user.token.expires_at))) {
      return request.post("" + config.api.url + "/oauth/token").send({
        refresh_token: req.user.token.refresh_token,
        client_id: 'client',
        client_secret: 'secret',
        grant_type: "refresh_token"
      }).end(function(err, response) {
        var auth;
        if (err) {
          return next(err);
        }
        auth = {
          access_token: response.body.access_token,
          refresh_token: response.body.refresh_token,
          expires_in: response.body.expires_in,
          token_type: response.body.token_type,
          scope: response.body.scope
        };
        return req.login(auth, function(err) {
          return next(err);
        });
      });
    } else {
      return next();
    }
  };
};
