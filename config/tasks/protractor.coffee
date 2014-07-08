protractor = require("gulp-protractor").protractor
webdriver_update = require('gulp-protractor').webdriver_update

module.exports = (gulp, $) ->
  gulp.task 'webdriver_update', webdriver_update

  gulp.task 'protractor', ['webdriver_update'], (cb) ->
    gulp.src("spec/integration/**/*.js")
      .pipe(protractor
        configFile: "config/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
      )
      .on('error', (e) ->
        $.util.log e
      )
      .on('end', cb)
