module.exports = function(gulp) {
  return gulp.task("build", ["clean", "coffee", "sass", "html", "icons", "imagemin", "jb"]);
};
