var buildAuth   = require('think-ministry/auth'),
    config      = require('./config'),
    credentials = {
      clientID: config.get('CLIENT_ID'),
      clientSecret: config.get('CLIENT_SECRET'),
      site: config.get('API_URL'),
      authorizationPath: '/oauth/authorize',
      tokenPath: '/oauth/token'
    };

module.exports = {
  getToken: function(username, password) {
    var auth = buildAuth(credentials);

    return auth.getToken(username, password);
  }
}
