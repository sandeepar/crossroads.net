crossroads.controller "LoginCtrl", ($scope, $http, Auth, $rootScope) ->
  $scope.login = ->
    Auth.login($scope.user.username, $scope.user.password)

    $http.get('/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo')
      .then (response) ->
        $scope.currentUser = response.data
        return
      return
