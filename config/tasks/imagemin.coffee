pngcrush = require 'imagemin-pngcrush'

module.exports = (gulp, $) ->
  gulp.task 'imagemin', ['jb'], ->
    gulp.src('generated/img/*')
      .pipe($.imagemin(
            progressive: true
            svgoPlugins: [removeViewBox: false]
            use: [pngcrush()]
      ))
      .pipe(gulp.dest('generated/img/'))
