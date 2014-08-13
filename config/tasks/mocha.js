module.exports = function(gulp, $) {
  return gulp.task('mocha', function() {
    gulp.src('server/test/**/*.coffee', { read: false })
      .pipe($.mocha());
  });
};
