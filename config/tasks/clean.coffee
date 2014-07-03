module.exports = (gulp, $) ->
  gulp.task "clean", ->
    gulp.src("{.tmp,generated}/{js,css}/**/*.*").pipe $.clean()
    return
