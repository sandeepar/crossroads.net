templateCache = require 'gulp-angular-templatecache'
coffeelint = require 'gulp-coffeelint'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
ngmin = require 'gulp-ngmin'
uglify = require 'gulp-uglify'
livereload = require 'gulp-livereload'
paths = require '../paths'
gulpif = require 'gulp-if'
streamqueue = require 'streamqueue'
args = require('yargs').argv

n = args.n

module.exports = (gulp, notify, devEnv) ->
  gulp.task "coffee", ->
    streamqueue(
      objectMode: true,
      gulp.src(paths.scripts)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe(coffee().on("error", gutil.log)),
      gulp.src(paths.templates)
        .pipe(templateCache(standalone: true)))
        .pipe(concat("app.js"))
        .pipe(gulpif(not devEnv, ngmin()))
        .pipe(gulpif(not devEnv, uglify()))
        .pipe(gulp.dest("generated/js"))
        .pipe(gulpif(devEnv, livereload())
    ).pipe(gulpif(devEnv and not n, notify('Coffee is done')))
