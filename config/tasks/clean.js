module.exports = function(gulp, $) {
  return gulp.task("clean", function() {
    gulp.src("generated/{js,css}/**/*.*").pipe($.clean());
  });
};
