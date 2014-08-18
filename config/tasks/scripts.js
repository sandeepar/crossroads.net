var paths = require('../paths'),
    streamqueue = require('streamqueue'),
    browserSync = require('browser-sync');

module.exports = function(gulp, opts, $) {
  return gulp.task('scripts', ['clean:js'], function() {
    var stream = streamqueue({ objectMode: true });

    stream.queue(
      gulp.src(paths.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.util.noop())
     );

    stream.queue(
      gulp.src(paths.templates)
        .pipe($.angularTemplatecache({ standalone: true }))
    );

    return stream.done()
      .pipe(opts.dev ? gulp.dest(".tmp/js") : $.util.noop())
      .pipe($.concatSourcemap("app.js", { prefix: 2 }))
      .pipe(gulp.dest(".tmp/js"))
      .pipe(opts.dev ? browserSync.reload({ stream: true, once: true }) : $.util.noop())
      .pipe(opts.dev && !opts.n ? $.notify('Coffee is done') : $.util.noop());
  });
};
