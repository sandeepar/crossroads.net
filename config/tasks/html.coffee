module.exports = (gulp, $) ->
  gulp.task 'html', ['jb'], ->
    gulp.src('generated/index.html')
      .pipe($.usemin
        css: [$.csso(), $.rev()]
        js: [$.ngmin(), $.uglify(), $.rev()]
        html: [$.minifyHtml()]
      )
      .pipe(gulp.dest('generated/'))
