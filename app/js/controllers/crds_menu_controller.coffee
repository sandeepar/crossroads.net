angular.module('crossroads')

.controller "crdsMenuCtrl", ($scope, $rootScope) ->
  $scope.menuShow = false
  $scope.loginShow = false

  $scope.toggleDesktopLogin = ->
    if $scope.loginShow == true
      $scope.loginShow = false
    else
      $scope.loginShow = true

  $scope.toggleMenu = ->
    if $scope.menuShow == true
      $("header").removeClass("show")
      $("header").removeClass("overlay")
      $("#container").removeClass("show")
      $scope.menuShow = false
    else
      $("header").addClass("show")
      $("header").addClass("overlay")
      $("#container").addClass("show")
      $scope.menuShow = true

  $rootScope.$on 'login:hide', ->
    $scope.toggleDesktopLogin()
