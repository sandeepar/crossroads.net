var paths = require('../paths'),
    streamqueue = require('streamqueue'),
    browserSync = require('browser-sync');

module.exports = function(gulp, opts, $) {
  return gulp.task("coffee", function() {
    return streamqueue({
      objectMode: true
    }, gulp.src(paths.scripts).pipe($.coffeelint()).pipe($.coffeelint.reporter()).pipe($.coffee().on("error", $.util.log)), gulp.src(paths.templates).pipe($.angularTemplatecache({
      standalone: true
    }))).pipe(opts.dev ? gulp.dest(".tmp/js") : $.util.noop()).pipe($.concatSourcemap("app.js", {
      prefix: 2
    })).pipe(gulp.dest(".tmp/js")).pipe(opts.dev ? browserSync.reload({
      stream: true,
      once: true
    }) : $.util.noop()).pipe(opts.dev && !opts.n ? $.notify('Coffee is done') : $.util.noop());
  });
};
