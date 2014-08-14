var browserSync = require('browser-sync');

module.exports = function(gulp, opts, $) {
  return gulp.task('sass', ['clean:css'], function() {
    return gulp.src(["app/scss/main.scss", "modules/**/css/module.scss"])
      .pipe($.concat('app.scss'))
      .pipe($.rubySass({ sourcemap: false }).on("error", $.util.log))
      .pipe($.autoprefixer("last 2 versions", "Firefox >= 20", { cascade: true }))
      .pipe($.concat("app.css"))
      .pipe(gulp.dest(".tmp/css"))
      .pipe(opts.sync ? browserSync.reload({ stream: true, once: true }) : $.util.noop())
      .pipe(opts.dev && !opts.n ? $.notify('Sass is done') : $.util.noop());
  });
};
