(function() {
  angular.module("crdsProfile", ["crdsSecureUser"]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsProfile").directive("crdsProfile", function($timeout, $animate, $compile, $templateCache) {
    return {
      restrict: 'EA',
      scope: true,
      controller: function($scope, $element, $attrs) {
        return new ((function() {
          function _Class() {
            this.registerLogin = __bind(this.registerLogin, this);
            console.log("Profile Controller");
            this.addLoading();
            this.profileTemplate = $compile($templateCache.get('profile.html'));
            $scope.$watch("secureUser.loggedIn", (function(_this) {
              return function(loggedIn) {
                var parent, user;
                user = $scope.secureUser.user;
                if (loggedIn && user) {
                  console.log("crdsProfile - Current user has changed to " + user.firstName);
                  _this.removeLoading();
                  if (_this.loginCtrl) {
                    _this.loginCtrl.hide();
                  }
                  _this.profileElement = _this.profileTemplate($scope);
                  return $element.append(_this.profileElement);
                } else if (loggedIn === false) {
                  console.log("crdsProfile - User has now logged out");
                  _this.removeLoading();
                  parent = $element.parent();
                  if (_this.profileElement) {
                    _this.profileElement.remove();
                  }
                  if (_this.loginCtrl) {
                    return _this.loginCtrl.show(parent, $element);
                  }
                } else if (loggedIn === null) {
                  console.log("crdsProfile - User is in loading state");
                  if (_this.loginCtrl) {
                    _this.loginCtrl.hide();
                  }
                  if (_this.profileElement) {
                    _this.profileElement.remove();
                  }
                  return _this.addLoading();
                }
              };
            })(this));
          }

          _Class.prototype.registerLogin = function(loginCtrl) {
            console.log("Registered login controller");
            return this.loginCtrl = loginCtrl;
          };

          _Class.prototype.removeLoading = function() {
            if ($attrs.loadingClass) {
              $animate.removeClass($element, $attrs.loadingClass);
            }
            return $element.html('');
          };

          _Class.prototype.addLoading = function() {
            if ($attrs.loadingClass) {
              return $animate.addClass($element, $attrs.loadingClass);
            }
          };

          return _Class;

        })());
      }
    };
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsProfile").directive("crdsProfileLogin", function($animate) {
    return {
      require: ['^crdsProfile', 'crdsProfileLogin'],
      restrict: 'EA',
      scope: true,
      terminal: true,
      priority: 1000,
      transclude: 'element',
      link: function($scope, $element, $attrs, controllers, $transclude) {
        var crdsProfileCtrl, crdsProfileLoginCtrl;
        console.log("crdsProfileLogin link()");
        crdsProfileCtrl = controllers[0];
        crdsProfileLoginCtrl = controllers[1];
        crdsProfileCtrl.registerLogin(crdsProfileLoginCtrl);
      },
      controller: function($scope, $element, $attrs, $transclude) {
        return new ((function() {
          function _Class() {
            this.hide = __bind(this.hide, this);
            this.show = __bind(this.show, this);
          }

          _Class.prototype.show = function(parent, after) {
            if (!this.loginElement) {
              return $transclude((function(_this) {
                return function(clone, newScope) {
                  _this.loginElement = clone;
                  return $animate.enter(clone, parent, after);
                };
              })(this));
            }
          };

          _Class.prototype.hide = function() {
            if (this.loginElement) {
              $animate.leave(this.loginElement);
              return this.loginElement = null;
            }
          };

          return _Class;

        })());
      }
    };
  });

}).call(this);

angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("profile.html","<div class=\"crds-profile-container\">\n    This is the profile container\n</div>");}]);