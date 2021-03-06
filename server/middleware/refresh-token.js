// There are no tests for this and after talking with James Smith, he indicated
// that he's not sure if this is working or not.
var moment = require('moment'),
    request = require('superagent'),
    config = require('../config'),
    util = require('util');

module.exports = function() {
  return function(req, res, next) {
    if ((req.user != null ) && req.user.token && (req.user.token.expires_at != null) && moment().add('seconds', 30).isAfter(moment(req.user.token.expires_at))) {
      return request.post("" + config.get('API_URL') + "/oauth/token").send({
        refresh_token: req.user.token.refresh_token,
        client_id: config.get('CLIENT_ID'),
        client_secret: config.get('CLIENT_SECRET'),
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
