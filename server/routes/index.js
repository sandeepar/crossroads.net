module.exports = function(app) {
  var passport = require('passport');
  var moment = require('moment');

  require('./form-mailer')(app);
  require('./login')(app);
  require('./logout')(app);
  require('./error')(app);

  passport.serializeUser(function(token, done) {
    if (token.expires_at != null) {
      token.expires_at = moment().add('seconds', token.expires_at);
    }
    return done(null, JSON.stringify(token));
  });

  passport.deserializeUser(function(str, done) {
    return done(null, JSON.parse(str));
  });
};
