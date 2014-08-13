'use strict';

angular.module('crdsProfile')

.directive('crdsProfileLogin', function($animate) {
  return {
    require: ['^crdsProfile', 'crdsProfileLogin'],
    restrict: 'EA',
    scope: true,
    terminal: true,
    priority: 1000,
    transclude: 'element',
    link: function($scope, $element, $attrs, controllers) {
      var crdsProfileCtrl = controllers[0],
          crdsProfileLoginCtrl = controllers[1];
      crdsProfileCtrl.registerLogin(crdsProfileLoginCtrl);
    },
    controller: function($scope, $element, $attrs, $transclude) {
      return {
        show: function(parent, after) {
          if (!this.loginElement) {
            $transclude(function(clone) {
              this.loginElement = clone;
              $animate.enter(clone, parent, after);
            });
          }
        },
        hide: function() {
          if (this.loginElement) {
            $animate.leave(this.loginElement);
            this.loginElement = null;
          }
        }
      };
    }
  };
});
