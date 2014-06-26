paths = require '../paths'

module.exports = (gulp) ->
  gulp.task "watch", ->
    gulp.watch [
      paths.scripts
      paths.templates
    ], ["coffee"]
    gulp.watch paths.sass, ["sass"]
    gulp.watch 'app/img/*.svg', ['icons', 'sass']
    return
