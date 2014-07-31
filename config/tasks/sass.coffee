args = require('yargs').argv
browserSync = require 'browser-sync'

n = args.n
sync = args.sync

module.exports = (gulp, devEnv, $) ->
  gulp.task "sass", ->
    gulp.src(["app/css/main.scss"])
      .pipe($.rubySass(sourcemap: false).on("error", $.util.log))
      .pipe($.autoprefixer("last 2 versions", "Firefox >= 20", cascade: true))
      .pipe($.concat("app.css"))
      .pipe(gulp.dest(".tmp/css"))
      .pipe(if sync then browserSync.reload(stream: true, once: true) else $.util.noop())
      .pipe(if devEnv and not n then $.notify('Sass is done') else $.util.noop())
    return
