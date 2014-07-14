  config = 
    className: ".%f-icon"
    defs: true
    generatePreview: true
  
  module.exports = (gulp, $) ->
    gulp.task "icons", ->
      svg = $.svgSprites.svg
      rename = $.rename
      gulp.src("app/icons/*.svg")
      .pipe(svg(config))
      .pipe(gulp.dest("app/_includes/icons"))
      
      gulp.src('app/_includes/icons/css/sprites.css')
      .pipe(rename("sprites.scss"))
      .pipe(gulp.dest('app/css'))