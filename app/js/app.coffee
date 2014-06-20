crossroads = angular.module "crossroads", ["ngCookies", 'ngAnimate', 'mgcrea.ngStrap', 'angular-growl']

crossroads.config (growlProvider) ->
  growlProvider.globalPosition 'top-center'
  growlProvider.globalTimeToLive 6000
  growlProvider.globalDisableIcons true

crossroads.controller "AppCtrl", ($scope, $log, growl)->

  #
  # Event listeners for notifications that will trigger "Growl" style alerts
  #
  $scope.$on 'notify.success', (event, message) ->
    growl.success message

  $scope.$on 'notify.info', (event, message) ->
    growl.info message

  $scope.$on 'notify.warning', (event, message) ->
    growl.warning message

  $scope.$on 'notify.error', (event, message) ->
    growl.error message

  return

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return

crossroads.directive "crdsMenu", ->
  controller: "crdsMenuCtrl",
  templateUrl: "/templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"

crossroads.controller "crdsMenuCtrl", ($scope, $rootScope) ->
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

crossroads.run (Auth) ->
  # Auth.authenticate()
  return

crossroads.directive "authForm", ->
  restrict: "EA"
  templateUrl: "/templates/login.html"
  controller: "LoginCtrl"

crossroads.factory "Auth", ($cookieStore, $http, $location, $rootScope) ->
  login: (username, password) ->
    data =
      username: username
      password: password
    $http(
      url: "/login"
      method: "POST"
      data: $.param(data)
      headers:
        "Content-Type": "application/x-www-form-urlencoded"
        Authorization: null
    ).success((data, status, headers, config) ->
      $rootScope.$emit 'login:hide'
    ).error (data, status) ->
      if status is 0
        console.log "Could not reach API"
      else console.log "Invalid username & password"
      return
    return

crossroads.controller "LoginCtrl", ($scope, $http, Auth, $rootScope) ->
  $scope.login = ->
    Auth.login($scope.user.username, $scope.user.password)

    $http.get('/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo').then (response) ->
      $scope.currentUser = response.data
      return
    return
return