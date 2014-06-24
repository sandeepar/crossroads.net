concat = require 'gulp-concat'
vendor = require '../files'
jsmin = require 'gulp-jsmin'
uglify = require 'gulp-uglify'
gulpif = require 'gulp-if'

module.exports = (gulp, devEnv) ->
  gulp.task "vendor", ->
    gulp.src(vendor.js)
      .pipe(concat("vendor.js"))
      .pipe(gulpif(not devEnv, jsmin()))
      .pipe(gulpif(not devEnv, uglify()))
      .pipe gulp.dest("generated/js")
