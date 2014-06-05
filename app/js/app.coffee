crossroads = angular.module "crossroads", ["ngCookies", 'mgcrea.ngStrap']

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return

crossroads.directive "crdsMenu", ->
  templateUrl: "templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"

crossroads.run(($rootScope) ->
  $rootScope.CONFIG =
    apiUrl: "https://my.crossroads.net/ministryplatform/oauth"
    clientId: "client"
    clientSecret: "secret"

  return
).run ($cookieStore, $location, $http, $rootScope, Auth) ->
  Auth.authenticate()
  return

crossroads.directive "authForm", ->
  restrict: "EA"
  templateUrl: "templates/login.html"
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
      client_id: $rootScope.CONFIG.clientId
      client_secret: $rootScope.CONFIG.clientSecret
      grant_type: "password"
      username: username
      password: password

    $http(
      url: $rootScope.CONFIG.apiUrl + "/token"
      method: "POST"
      data: $.param(data)
      headers:
        "Content-Type": "application/x-www-form-urlencoded"
        Authorization: null
    ).success((data, status, headers, config) ->
      console.log "Authentication Successful!"
      $cookieStore.put "auth", data
      authenticate data.access_token
      redirectToHome()
      return
    ).error (data, status) ->
      if status is 0
        console.log "Could not reach API"
      else console.log "Invalid username & password"  if data.error is "invalid_grant"
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


$(document).ready ->
  menu = $('#sp-nav, #sp-page')

  $('.navbar-toggle').on 'click', ->
    menu.toggleClass('show')
