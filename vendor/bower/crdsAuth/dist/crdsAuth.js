/* crdsAuth - 0.0.1
 * Crossroads authentication
 * https://your/lib/name/here
 */
(function() {
  angular.module("crdsAuth", ["ngCookies"]).run(function($rootScope) {
    $rootScope.CONFIG = {
      apiUrl: "https://my.crossroads.net/ministryplatform/oauth",
      clientId: "client",
      clientSecret: "secret"
    };
  }).run(function($cookieStore, $location, $http, $rootScope, Auth) {
    Auth.authenticate();
  });

  angular.module("crdsAuth").directive("authForm", function() {
    return {
      restrict: "EA",
      templateUrl: "login.html",
      controller: "LoginCtrl"
    };
  });

  angular.module("crdsAuth").factory("Auth", function($cookieStore, $http, $location, $rootScope) {
    var auth, authenticate, getAuthToken, redirectToHome, redirectToLogin;
    auth = $cookieStore.get("auth");
    redirectToLogin = function() {
      return $location.path("/");
    };
    redirectToHome = function() {
      return $location.path("/");
    };
    getAuthToken = function() {
      try {
        return auth.access_token;
      } catch (_error) {}
    };
    authenticate = function(accessToken) {
      var config;
      if (typeof accessToken === "undefined") {
        accessToken = getAuthToken();
      }
      $http.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      config = {
        method: "GET",
        url: $rootScope.CONFIG.apiUrl + "/me"
      };
      $http(config).success(function(data) {
        $rootScope.user = data;
      }).error(function(data, status) {
        if (status === 0) {
          console.log("Could not reach API");
        }
        redirectToLogin();
      });
    };
    return {
      authenticate: function() {
        return authenticate();
      },
      getAccessToken: function(username, password) {
        var data;
        data = {
          client_id: $rootScope.CONFIG.clientId,
          client_secret: $rootScope.CONFIG.clientSecret,
          grant_type: "password",
          username: username,
          password: password
        };
        $http({
          url: $rootScope.CONFIG.apiUrl + "/token",
          method: "POST",
          data: $.param(data),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: null
          }
        }).success(function(data, status, headers, config) {
          console.log("Authentication Successful!");
          $cookieStore.put("auth", data);
          authenticate(data.access_token);
          redirectToHome();
        }).error(function(data, status) {
          if (status === 0) {
            console.log("Could not reach API");
          } else {
            if (data.error === "invalid_grant") {
              console.log("Invalid username & password");
            }
          }
        });
      },
      logout: function() {
        $cookieStore.remove("auth");
      },
      redirectToLogin: function() {
        return redirectToLogin();
      },
      redirectToHome: function() {
        return redirectToHome();
      }
    };
  });

  angular.module("crdsAuth").controller("LoginCtrl", function($scope, Auth) {
    $scope.login = function() {
      Auth.getAccessToken($scope.user.username, $scope.user.password);
    };
  });

  return;

}).call(this);

angular.module("crdsAuth").run(["$templateCache", function($templateCache) {

  $templateCache.put("login.html",
    "<div class=\"login col-md-12\">\n" +
    "  <div class=\"dd_menu\">\n" +
    "    <div class=\"primary\">\n" +
    "      <h3>Login</h3>\n" +
    "      <form id=\"nav_login\" role=\"form\" ng-submit=\"login()\">\n" +
    "\t<div class=\"form-group\">\n" +
    "\t  <div class=\"input-group\">\n" +
    "\t    <input class=\"form-control\" type=\"text\" name=\"userName\" id=\"username_nav\" placeholder=\"Username\" ng-model=\"user.username\">\n" +
    "\t    <span class=\"input-group-addon\"><a href=\"#\">@</a></span>\n" +
    "\t  </div>\n" +
    "\t  <div class=\"input-group\">\n" +
    "\t    <input class=\"form-control\" autocomplete=\"off\" type=\"password\" name=\"password\" id=\"password_nav\" placeholder=\"Password\" ng-model=\"user.password\">\n" +
    "\t    <span class=\"input-group-addon\"> <a href=\"#\">@</a></span>\n" +
    "\t  </div>\n" +
    "\t  <input type=\"submit\" name=\"submit_nav\" value=\"Login\" id=\"submit_nav\" class=\"col-md-12 btn submit\" >\n" +
    "\t  <div style=\"font-size: smaller;\">\n" +
    "\t    <input type=\"checkbox\" name=\"remember\" id=\"remember_nav\">\n" +
    "\t    <label for=\"remember\">Stay Logged In</label>\n" +
    "\t  </div>\n" +
    "\t</div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
