require('jasmine-given');

var LoginPage = require('./pages/login_page');

describe('app', function() {
  var page = new LoginPage();

  describe('signing in with valid credentials', function() {
    Given(function() {page.visitPage()});
    Given(function() {page.showForm()});
    Given(function() {page.fillEmail('janders')});
    Given(function() {page.fillPassword()});
    When(function()  {page.login()});
    Then(function()  {
      page.getCurrentUser().then(function(text) {
        expect(text).toEqual("James")
      });
    });
  });
});
