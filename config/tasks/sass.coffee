browserSync = require 'browser-sync'

module.exports = (gulp, opts, $) ->
  gulp.task "sass", ->
    gulp.src(["app/scss/main.scss", "modules/**/css/module.scss"])
      .pipe($.concat("app.scss"))
      .pipe($.rubySass(sourcemap: false).on("error", $.util.log))
      .pipe($.autoprefixer("last 2 versions", "Firefox >= 20", cascade: true))
      .pipe($.concat("app.css"))
      .pipe(gulp.dest(".tmp/css"))
      .pipe(if opts.sync then browserSync.reload(stream: true, once: true) else $.util.noop())
      .pipe(if opts.dev and not opts.n then $.notify('Sass is done') else $.util.noop())
    return
