module.exports = function(gulp) {
  return gulp.task("test", ["clean", "sass", "karma", "protractor", "spec-watch"]);
};
