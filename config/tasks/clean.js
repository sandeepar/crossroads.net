var del = require('del');

module.exports = function(gulp, $) {
  return gulp.task("clean", function(cb) {
    del(["generated/{js,css}/**/*.*", ".tmp/**/*"], cb)
  });
};
