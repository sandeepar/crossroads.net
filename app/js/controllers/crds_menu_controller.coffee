angular.module('crossroads')

.controller "crdsMenuCtrl", ($scope, $rootScope, Auth) ->
  $scope.logout = ->
    Auth.logout()

  $scope.menuShow = false
  $scope.loginShow = false

  $scope.toggleDesktopLogin = ->
    if $scope.loginShow == true
      $scope.loginShow = false
    else
      $scope.loginShow = true

  $scope.toggleMenu = ->
    thing = $(this).attr("class")
    if $scope.menuShow == true
      $(".overlay_container").removeClass("show")
      $(".overlay_container").removeClass("overlay")
      $("#container").removeClass("show")
      $scope.menuShow = false
    else
      $(".overlay_container").addClass("show")
      $(".overlay_container").addClass("overlay")
      $("#container").addClass("show")
      $scope.menuShow = true

  $rootScope.$on 'login:hide', ->
    if $scope.loginShow == true
      $scope.toggleDesktopLogin()

  $rootScope.$on 'menu:toggle', ->
    $scope.toggleMenu()
