angular.module('crossroads')

.controller "LoginCtrl", ($scope, Auth, growl) ->
  $scope.login = ->
    promise = Auth.login($scope.user.username, $scope.user.password)
    promise.then ->
      Auth.getCurrentUser()
      $scope.loginError = undefined
    , (error) ->
      growl.error "Login failed."
      $scope.loginError = "Login failed."
