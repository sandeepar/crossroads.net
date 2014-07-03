angular.module('crossroads')

.controller "crdsMenuCtrl", ($scope, $rootScope, Menu, Auth) ->

  $scope.menu = Menu

  $scope.logout = ->
    Auth.logout()

  $scope.loginShow = false

  $scope.toggleDesktopLogin = ->
    if @loginShow == true
      @loginShow = false
    else
      @loginShow = true

  $scope.toggleMenuDisplay = ->
    @menu.toggleMobileDisplay()

  $rootScope.$on 'login:hide', ->
    $scope.loginShow = false
