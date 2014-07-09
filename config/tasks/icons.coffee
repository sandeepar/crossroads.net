  config = 
    className: ".%f-icon"
    defs: true
  
  module.exports = (gulp, $) ->
    gulp.task "icons", ->
      svg = $.svgSprites.svg
      gulp.src("app/img/*.svg")
      .pipe(svg(config))
      .pipe(gulp.dest("app/icons"))