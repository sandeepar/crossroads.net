module.exports = (gulp, $) ->
  gulp.task 'html', ['coffee', 'sass'], ->
    gulp.src(['app/_includes/head.html', 'app/_includes/footer.html'])
      .pipe($.usemin
        css: [$.csso(), $.rev()]
        js: [$.ngmin(), $.uglify(), $.rev()]
        html: [$.minifyHtml()]
      )
      .pipe(gulp.dest('app/_includes'))
