angular.module('crossroads')

.controller "LoginCtrl", ($scope, Auth, growl) ->
  $scope.user = {}

  $scope.login = ->
    promise = Auth.login($scope.user.username, $scope.user.password)
    if @user.username and @user.password
      $scope.processing = "Logging in..."
      promise.then ->
        Auth.getCurrentUser()
        $scope.loginError = undefined
      , (error) ->
        console.log error
        $scope.processing = null
        $scope.loginError = "Login failed."
    else
      $scope.loginError = "Username/password can't be blank"
