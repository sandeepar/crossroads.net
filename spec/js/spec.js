(function() {
  describe("crds menu directive", function() {
    beforeEach(function() {
      module("crossroads");
      return module("templates");
    });
    beforeEach(inject(function($compile, $rootScope, $httpBackend) {
      this.scope = $rootScope.$new();
      this.scope.menu = {
        headings: [
          {
            title: "hi"
          }, {
            link: "foo",
            items: [
              {
                title: "thing",
                link: "#"
              }
            ]
          }
        ]
      };
      this.compile = $compile;
      this.element = this.compile("<div crds-menu='menu'></div>")(this.scope);
      this.scope.$digest();
    }));
    it("should have an element", function() {
      console.log(this.element.html());
      return expect(this.element.html().length).toBeGreaterThan(0);
    });
    it("should render a menu", function() {
      return expect(this.element.find(".heading__title").html()).toMatch(/hi/);
    });
    return it("should render items", function() {
      return expect(this.element.find(".heading__item").html()).toMatch(/thing/);
    });
  });

}).call(this);


//# sourceMappingURL=spec.js.map