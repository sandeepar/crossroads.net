describe "LoginController", ->
  beforeEach module("crossroads")

  beforeEach inject ($controller) ->
    @mockAuth = createSpyObject("Auth", ["login", "getCurrentUser"])
    @scope = {}
    $controller "LoginCtrl",
      $scope: @scope
      Auth: @mockAuth
