module.exports = function(gulp) {
  return gulp.task("ci", ["karma", "protractor"]);
};
