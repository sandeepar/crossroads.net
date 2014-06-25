paths = require '../paths'
streamqueue = require 'streamqueue'
args = require('yargs').argv
browserSync = require 'browser-sync'

n = args.n

module.exports = (gulp, notify, devEnv, $) ->
  gulp.task "coffee", ->
    streamqueue(
      objectMode: true,
      gulp.src(paths.scripts)
        .pipe($.coffeelint())
        .pipe($.coffeelint.reporter())
        .pipe($.coffee().on("error", $.util.log)),
      gulp.src(paths.templates)
        .pipe($.angularTemplatecache(standalone: true)))
      .pipe($.concat("app.js"))
      .pipe(gulp.dest(".tmp/js"))
      .pipe(if devEnv then browserSync.reload(stream: true, once: true) else $.util.noop())
      .pipe(if devEnv and not n then notify('Coffee is done') else $.util.noop())
