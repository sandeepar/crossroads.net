devEnv = process.env.NODE_ENV == 'development'

gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'
reload = browserSync.reload()

# Growl notification when Jekyll completes
notify = require 'gulp-notify'
nn = require 'node-notifier'
notifier = new nn()

require('./tasks/clean')(gulp, $)
require('./tasks/jekyll')(gulp, notifier, devEnv)
require('./tasks/jekyll_build')(gulp)
require('./tasks/coffee')(gulp, notify, devEnv, $)
require('./tasks/sass')(gulp, notify, devEnv, $)
require('./tasks/server')(gulp, $)
require('./tasks/karma')(gulp)
require('./tasks/watch')(gulp)
require('./tasks/spec_watch')(gulp)
require('./tasks/test')(gulp)
require('./tasks/ci')(gulp)
require('./tasks/dev')(gulp)
require('./tasks/imagemin')(gulp, $)
require('./tasks/html')(gulp, $)
require('./tasks/build')(gulp)
require('./tasks/default')(gulp)
require('./tasks/pagespeed')(gulp)
