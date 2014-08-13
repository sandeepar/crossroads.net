module.exports = function(gulp) {
  return gulp.task("dev", ["clean", "scripts", "sass", "icons", "jekyll", "server", "watch"]);
};
