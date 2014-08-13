module.exports = function(gulp) {
  return gulp.task("ci", ["clean", "karma", "protractor"]);
};
