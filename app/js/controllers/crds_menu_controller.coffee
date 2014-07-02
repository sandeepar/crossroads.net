angular.module('crossroads')

.controller "crdsMenuCtrl", ($scope, $rootScope, Menu, Auth) ->

  $scope.menu = Menu

  $scope.logout = ->
    Auth.logout()

  $scope.menuSelection = {}

  $scope.collapsed = (index)->
    index != @menuSelection.index

  $scope.toggleMenuItem = (index) ->
    if @collapsed(index)
      @menuSelection.index = index
    else
      @menuSelection = {}

  $scope.menuShow = false
  $scope.loginShow = false

  $scope.toggleDesktopLogin = ->
    if $scope.loginShow == true
      $scope.loginShow = false
    else
      $scope.loginShow = true

  $scope.toggleMenuDisplay = ->
    thing = $(this).attr("class")
    @menu.toggleMobileDisplay()

  $rootScope.$on 'login:hide', ->
    if $scope.loginShow == true
      $scope.toggleDesktopLogin()

  $rootScope.$on 'menu:toggle', ->
    $scope.toggleMenu()
