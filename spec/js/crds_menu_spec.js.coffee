describe "crds menu directive", ->
  beforeEach ->
    module("crossroads")
    module('/templates/crdsMenu.html')
    module('/templates/login.html')

  beforeEach inject(($compile, $rootScope, $httpBackend) ->
    $httpBackend.whenGET("https://my.crossroads.net/ministryplatform/oauth/me")
      .respond("Success")

    @scope = $rootScope
    @scope.menu = {
      headings: [
        title: "hi",
  	    link: "foo",
  	    items : [
      	  {title: "thing",  link: "#"}]
      ]
    }

    @compile = $compile
    @element = @compile("<div crds-menu='menu'></div>")(@scope)
    @scope.$digest()
    return
  )

  it "should have an element", ->
    expect(@element.html().length).toBeGreaterThan(0)
  it "should render a menu", ->
    expect(@element.find(".heading__title").html()).toMatch /hi/
  it "should render items", ->
    expect(@element.find(".heading__item").html()).toMatch /thing/
