module.exports = (gulp) ->
  config = 
    className: ".%f-icon"
    defs: true

  svgSprites = require("gulp-svg-sprites")
  svg = svgSprites.svg
  gulp.task "sprites", ->
    gulp.src("svg/*.svg")
    .pipe(svg(config))
    .pipe(gulp.dest("svg"))
