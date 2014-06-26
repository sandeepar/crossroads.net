iconfont = require 'gulp-iconfont'
consolidate = require 'gulp-consolidate'
_ = require 'lodash'

module.exports = (gulp) ->
  gulp.task 'icons', ->
    gulp.src(["app/img/*.svg"])
      .pipe( iconfont(fontName: "crossroads", normalize: true, centerHorizontally: true)).on("codepoints", (codepoints) ->
        codepoints = _.map(codepoints, (codepoint) ->
          name: codepoint.name
          codepoint: codepoint.codepoint.toString(16)
        )
        gulp.src("app/css/templates/crossroads.scss")
          .pipe(consolidate("lodash",
            glyphs: codepoints
            fontName: "crossroads"
            fontPath: "../fonts/"
            className: 'icon'
          ))
          .pipe gulp.dest("app/css/")
          return
    ).pipe gulp.dest("app/fonts/")
