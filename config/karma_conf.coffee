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
    "vendor/bower/angular-bootstrap/ui-bootstrap.min.js"
    "vendor/bower/angular-bootstrap/ui-bootstrap-tpls.min.js"
    "vendor/bower/angular-growl-v2/build/angular-growl.js"
    "vendor/bower/angular-cookies/angular-cookies.min.js"
    "vendor/bower/angular-mocks/angular-mocks.js"
    "vendor/bower/crds-angular-ajax-form/dist/crds-angular-ajax-form.min.js"
    ".tmp/js/app.js"
    "spec/js/**/*.coffee"
    "app/templates/**/*.html"
  ]
