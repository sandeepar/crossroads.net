module.exports = (gulp, $) ->
  gulp.task 'mocha', ->
    gulp.src('server/test/**/*.coffee', read: false)
      .pipe($.mocha())
