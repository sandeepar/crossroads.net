var spawn = require('child_process').spawn,
    protractor = require("gulp-protractor").protractor;

module.exports = function(gulp, $) {
  return gulp.task('protractor', ["webdriver_update", "jekyll_ci"], function() {
    var server;
    server = spawn('node', ['server/server.js']);
    server.stdout.on('data', function(data) {
      console.log('[ci server] ', data.toString());
    });
    gulp.src("spec/integration/**/*_spec.js").pipe(protractor({
      configFile: "config/protractor.conf.js",
           args: ['--baseUrl', 'http://127.0.0.1:8000']
    })).on('end', function() {
      server.kill('SIGTERM');
    });
  });
};
