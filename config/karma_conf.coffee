module.exports =
  preprocessors:
    "**/*.coffee": ["coffee"]
    "**/*.html": ["ng-html2js"]

  coffeePreprocessor:
    options:
      bare: false
      sourceMap: false

  ngHtml2JsPreprocessor:
    stripPrefix: "app"

  browsers: ["PhantomJS"]
  frameworks: ["jasmine"]
  files: [
    "spec/helpers/*.js"
    "vendor/js/jquery.js"
    "vendor/bower/angular/angular.min.js"
    "vendor/bower/angular-animate/angular-animate.min.js"
    "vendor/bower/angular-growl-v2/build/angular-growl.js"
    "vendor/bower/angular-strap/dist/angular-strap.min.js"
    "vendor/bower/angular-strap/dist/angular-strap.tpl.min.js"
    "vendor/bower/angular-cookies/angular-cookies.min.js"
    "vendor/bower/angular-mocks/angular-mocks.js"
    ".tmp/js/app.js"
    "spec/js/**/*.coffee"
    "app/templates/**/*.html"
  ]
