/* crossroadsMenu - 0.0.1
 * Crossroads menu directive
 * https://your/lib/name/here
 */
(function() {
  angular.module("crossroadsMenu", ["crdsAuth"]).directive("crdsMenu", function() {
    return {
      templateUrl: "crdsMenu.html",
      require: "authForm",
      scope: {
        menus: "=crdsMenu"
      }
    };
  });

}).call(this);

angular.module("crossroadsMenu").run(["$templateCache", function($templateCache) {

  $templateCache.put("crdsMenu.html",
    "<div class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "  <div class=\"container-fluid container-max\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "              <span class=\"sr-only\">Toggle navigation</span>\n" +
    "              <span class=\"icon-bar\"></span>\n" +
    "              <span class=\"icon-bar\"></span>\n" +
    "              <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand logo\" href=\"/\"><img src=\"/img/logo.svg\" alt=\"crossroads\" /></a>\n" +
    "            <ul class=\"signin\">\n" +
    "              <li class=\"dropdown hidden-xs hidden-sm\" data-toggle=\"dropdown\">\n" +
    "                <a class=\"btn login dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n" +
    "                  <i class=\"icon icon--user\"></i>\n" +
    "                  <span>Sign In</span>\n" +
    "                </a>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\n" +
    "                  <li role=\"presentation\">\n" +
    "\t\t    <auth-form></auth-form>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "              <li class=\"visible-xs visible-sm\">\n" +
    "                <a class=\"btn login\" href=\"/login\">\n" +
    "                  <i class=\"icon icon--user\"></i>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"navbar-collapse collapse\">\n" +
    "            <ul class=\"nav navbar-nav col-xs-10\" id=\"sp-nav\">\n" +
    "              <li class=\"dropdown\" ng-repeat=\"heading in menus.headings\">\n" +
    "                <a class=\"dropdown-toggle heading__title\" data-toggle=\"dropdown\" href=\"#\">\n" +
    "                  <i class=\"icon {{heading.icon}}\"></i>\n" +
    "\t\t  {{heading.title}}\n" +
    "\t\t</a>\n" +
    "                <ul class=\"dropdown-menu col-sm-12\" role=\"menu\" aria-labeledby=\"dropdownMenu1\">\n" +
    "              \t  <li role=\"presentation\" ng-repeat=\"item in heading.items\">\n" +
    "                    <a class=\"heading__item\" role=\"menuitem\" tabindex=\"-1\" href=\"{{item.link}}\">{{item.title}}</a>\n" +
    "              \t  </li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
