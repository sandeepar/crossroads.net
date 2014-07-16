angular.module('crossroads')

.controller "LoginCtrl", ($scope, SecurityContext, growl) ->
  $scope.user = {}

  $scope.login = ->
    promise = SecurityContext.login($scope.user.username, $scope.user.password)
    if @user.username and @user.password
      $scope.processing = "Logging in..."
      promise.then ->
        $scope.loginError = undefined
      , (error) ->
        console.log error
        $scope.processing = null
        $scope.loginError = ["Oops!", "Login failed."]
    else
      $scope.loginError = ["Hold up!", "Username/password can't be blank"]
