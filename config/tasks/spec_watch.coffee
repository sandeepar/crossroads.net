paths = require '../paths'

module.exports = (gulp) ->
  gulp.task "spec-watch", ->
    gulp.watch [
      paths.specs
      paths.scripts
      paths.templates
    ], [
      "coffee"
      "karma"
    ]
    return
