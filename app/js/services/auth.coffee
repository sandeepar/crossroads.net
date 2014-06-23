angular.module('crossroads')

.factory "Auth", ($cookieStore, $http, $location, $rootScope) ->
  getCurrentUser: ->
    $http.get('/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo')
      .then (response) ->
        $rootScope.currentUser = response.data
      return

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
