crossroads = angular.module "crossroads", ["ngCookies", 'mgcrea.ngStrap']

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return

crossroads.directive "crdsMenu", ->
  controller: "crdsMenuCtrl",
  templateUrl: "/templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"

crossroads.controller "crdsMenuCtrl", ($scope) ->
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

crossroads.run(($rootScope) ->
  $rootScope.CONFIG =
    apiUrl: "/login"
    clientId: "client"
    clientSecret: "secret"

  return
).run ($cookieStore, $location, $http, $rootScope, Auth) ->
  # Auth.authenticate()
  return

crossroads.directive "authForm", ->
  restrict: "EA"
  templateUrl: "/templates/login.html"
  controller: "LoginCtrl"

crossroads.factory "Auth", ($cookieStore, $http, $location, $rootScope) ->
  auth = $cookieStore.get("auth")
  redirectToLogin = ->
    $location.path "/"

  redirectToHome = ->
    $location.path "/"

  getAuthToken = ->
    try
      return auth.access_token
    return

  authenticate = (accessToken) ->
    accessToken = getAuthToken()  if typeof (accessToken) is "undefined"
    $http.defaults.headers.common["Authorization"] = "Bearer " + accessToken
    config =
      method: "GET"
      url: $rootScope.CONFIG.apiUrl + "/me"

    $http(config).success((data) ->
      $rootScope.user = data
      return
    ).error (data, status) ->
      console.log "Could not reach API"  if status is 0
      redirectToLogin()
      return

    return

  authenticate: ->
    authenticate()

  getAccessToken: (username, password) ->
    data =
      username: username
      password: password

    $http(
      url: $rootScope.CONFIG.apiUrl
      method: "POST"
      data: $.param(data)
      headers:
        "Content-Type": "application/x-www-form-urlencoded"
        Authorization: null
    ).success((data, status, headers, config) ->
      $http.get('/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo').then (response) ->
        console.log "Current USER: ", response
        redirectToHome()
      return
    ).error (data, status) ->
      if status is 0
        console.log "Could not reach API"
      else console.log "Invalid username & password"
      return

    return

  logout: ->
    $cookieStore.remove "auth"
    return

  redirectToLogin: ->
    redirectToLogin()

  redirectToHome: ->
    redirectToHome()

crossroads.controller "LoginCtrl", ($scope, Auth) ->
  $scope.login = ->
    Auth.getAccessToken $scope.user.username, $scope.user.password
    return

  return

return
