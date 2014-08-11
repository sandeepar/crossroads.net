var LoginPage = (function() {
  function LoginPage() {
    this.formButton = element(by.css("#form-toggle"));
    this.userName = element(by.binding("securityContext.user.FirstName"));
    this.emailField = element(by.css(".navbar--login__dropdown #username_nav"));
    this.passwordField = element(by.css(".navbar--login__dropdown #password_nav"));
    this.loginButton = element(by.css(".navbar--login__dropdown #submit_nav"));
    this.loginForm = element(by.css(".navbar--login__dropdown #nav_login"));
  }

  LoginPage.prototype.visitPage = function() {
    browser.get('/');
  };

  LoginPage.prototype.showForm = function() {
    this.formButton.click();
    browser.isElementPresent(this.loginForm);
  };

  LoginPage.prototype.fillEmail = function(email) {
    this.emailField.sendKeys(email);
  };

  LoginPage.prototype.fillPassword = function() {
    this.passwordField.sendKeys("password");
  };

  LoginPage.prototype.login = function() {
    this.loginButton.click();
  };

  LoginPage.prototype.getCurrentUser = function() {
    return this.userName.getText();
  };
  return LoginPage;
})();

module.exports = LoginPage;
