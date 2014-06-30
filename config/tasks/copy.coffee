module.exports = (gulp) ->
  gulp.task 'copy', ['html'], ->
    gulp.src('app/_includes/css/*.css')
      .pipe(gulp.dest('generated/css/'))
    gulp.src('app/_includes/js/*.js')
      .pipe(gulp.dest('generated/js/'))
