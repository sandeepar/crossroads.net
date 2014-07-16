angular.module('crdsAuth', [])

.factory "Auth", ($http, $rootScope, $q) ->
  getCurrentUser: ->
    deferred = $q.defer()
    $http.get('/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo')
      .then (response) ->
        if typeof response.data is 'object'
          deferred.resolve response.data
        else
          deferred.resolve null
        return
      , (error) ->
        deferred.reject error

    return deferred.promise

  logout: ->
    $http.delete('/logout').then ->
      $rootScope.currentUser = null

  login: (username, password) ->
    deferred = $q.defer()

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
      deferred.resolve data
    ).error (data, status) ->
      if status is 0
        console.log "Could not reach API"
        deferred.reject "Could not reach API"
      else
        console.log "Invalid username & password"
        deferred.reject "Invalid username & password"

    return deferred.promise