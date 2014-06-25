concat = require 'gulp-concat'
vendor = require '../files'
ngmin = require 'gulp-ngmin'
uglify = require 'gulp-uglify'
gulpif = require 'gulp-if'

module.exports = (gulp, devEnv) ->
  gulp.task "angular", ->
    gulp.src(vendor.angular)
      .pipe(concat("angular.js"))
      .pipe(gulpif(not devEnv, ngmin()))
      .pipe(gulpif(not devEnv, uglify(mangle: false)))
      .pipe gulp.dest("generated/js")
