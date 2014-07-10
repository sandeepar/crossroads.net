<<<<<<< HEAD
  config = 
    className: ".%f-icon"
    defs: true
  
  module.exports = (gulp, $) ->
    gulp.task "icons", ->
      svg = $.svgSprites.svg
      gulp.src("app/img/*.svg")
      .pipe(svg(config))
      .pipe(gulp.dest("app/icons"))
=======
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
>>>>>>> d89b96d4f5dad66259ef8e6b19d427dd7c56f3c4
