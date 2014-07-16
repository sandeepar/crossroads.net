angular.module('crossroads')

.controller "crdsMenuCtrl", ($scope, $rootScope, Menu, SecurityContext) ->

  $scope.menu = Menu

  $scope.logout = ->
    SecurityContext.logout()

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
