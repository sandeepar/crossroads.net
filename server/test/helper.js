global.assert = require('assert');
global.crdsApp = require('../server.js').crdsApp;
global.replay = require('replay');

replay.fixtures = __dirname + '/fixtures'
