module.exports = function(gulp) {
  return gulp.task("build", ["clean", "scripts", "sass", "html", "icons", "imagemin", "jb"]);
};
