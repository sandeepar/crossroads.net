describe "LoginController", ->
  beforeEach module("crossroads")

  beforeEach inject ($controller, $q, Auth, $rootScope) ->
    @deferred = $q.defer()
    spyOn(Auth, "login").andReturn(@deferred.promise)
    @scope = $rootScope.$new()
    @scope.user =
      username: "wut"
      password: "ever"
    $controller "LoginCtrl",
      $scope: @scope

  xit "should add an error on login failure", ->
    @scope.login()
    @deferred.resolve("foo")
    @scope.$apply()
    expect(@scope.loginError).toEqual("Login failed.")
