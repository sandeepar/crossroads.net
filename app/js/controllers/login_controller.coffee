angular.module('crossroads')

.controller "LoginCtrl", ($scope, $http, Auth, $rootScope) ->
  $scope.login = ->
    Auth.login($scope.user.username, $scope.user.password).then ->
      Auth.getCurrentUser()
