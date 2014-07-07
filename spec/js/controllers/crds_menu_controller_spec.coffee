describe "crds menu controller spec", ->
  beforeEach ->
    module("crossroads")

  beforeEach inject ($controller, $rootScope) ->
    @scope = $rootScope.$new()
    @controller = $controller "crdsMenuCtrl",
      $scope: @scope

  describe "toggle desktop login", ->
    it "toggles", ->
      expect(@scope.loginShow).toBeFalsy()
      @scope.toggleDesktopLogin()
      expect(@scope.loginShow).toBeTruthy()
