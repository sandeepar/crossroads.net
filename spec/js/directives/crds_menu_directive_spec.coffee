describe "crds menu directive", ->
  beforeEach ->
    module("crossroads")
    module('/templates/crdsMenu.html')
    module('/templates/login.html')

  beforeEach inject(($compile, $rootScope, $httpBackend) ->
    $httpBackend.whenGET("https://my.crossroads.net/ministryplatform/oauth/me")
      .respond("Success")
    $httpBackend.whenGET("/api/ministryplatformapi/PlatformService.svc/GetCurrentUserInfo")
      .respond({"DateOfBirth":null,"DisplayName":"Doe, John","EmailAddress":"jdoe@example.net","ExternalIdentities":[],"FirstName":"John","GenderId":1,"LastName":"Doe","Locale":"","MaritalStatusId":2,"MiddleName":null,"MobilePhone":"513-555-1234","NewPassword":null,"Nickname":"John","PrefixId":null,"SuffixId":null,"Theme":"mpdark","TimeZoneId":""})

    @scope = $rootScope
    @scope.menu = {
      headings: [
        title: "hi",
  	    link: "foo",
  	    items : [
      	  {title: "thing",  link: "#", items: [title: "thing",  link: "#"]}]
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
    expect(@element.find(".navbar--heading__title").html()).toMatch /hi/
  it "should render items", ->
    expect(@element.find(".heading__item").html()).toMatch /thing/
