module.exports = (gulp, $) ->
  gulp.task 'mocha', ->
    gulp.src('server/test/**/*.coffee')
      .pipe($.mocha())
