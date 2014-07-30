var RegistrationPage = (function() {
  function RegistrationPage() {
    this.emailField = element(by.model("user.email"));
    this.submitButton = element(by.buttonText("Register"));
    this.alert = element(By.css('growl-item'));
  }

  RegistrationPage.prototype.visitPage = function() {
    browser.get("/register");
  };

  RegistrationPage.prototype.fillEmail = function() {
    this.emailField.sendKeys('wilbur@example.com');
  };

  RegistrationPage.prototype.submit = function() {
    this.submitButton.click();
  };

  RegistrationPage.prototype.getAlertText = function() {
    return this.alert.getText();
  };

  return RegistrationPage;
})();

module.exports = RegistrationPage;
