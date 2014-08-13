module.exports = function(gulp) {
  return gulp.task("dev", ["clean", "coffee", "sass", "icons", "jekyll", "server", "watch"]);
};
