var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    opts = {
      dev: process.env.NODE_ENV === 'development',
      n: args.n,
      sync: args.sync,
      burp: args.burp
    };

require('./tasks/clean')(gulp, $);
require('./tasks/jekyll')(gulp, opts, $);
require('./tasks/jekyll_build')(gulp);
require('./tasks/coffee')(gulp, opts, $);
require('./tasks/sass')(gulp, opts, $);
require('./tasks/server')(gulp, opts, $);
require('./tasks/karma')(gulp);
require('./tasks/watch')(gulp);
require('./tasks/spec_watch')(gulp);
require('./tasks/test')(gulp);
require('./tasks/webdriver')(gulp);
require('./tasks/protractor')(gulp, $);
require('./tasks/ci')(gulp);
require('./tasks/dev')(gulp);
require('./tasks/imagemin')(gulp, $);
require('./tasks/icons')(gulp, $);
require('./tasks/copy')(gulp);
require('./tasks/html')(gulp, $);
require('./tasks/build')(gulp);
require('./tasks/default')(gulp);
require('./tasks/mocha')(gulp, $);
require('./tasks/server_test')(gulp);
require('./tasks/server_watch')(gulp);
require('./tasks/jekyll_ci')(gulp);
