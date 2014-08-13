'use strict';

angular.module('crdsProfile')

.directive('crdsProfile',
    function($timeout, $animate) {
  return {
    restrict: 'EA',
    scope: true,
    template: 'profile/app/templates/profile.html',
    controller: function($scope, $element, $attrs, Profile) {
      return {
        registerLogin: function(loginCtrl) {
          this.loginCtrl = loginCtrl;
        },

        removeLoading: function() {
          if ($attrs.loadingClass) {
            $animate.removeClass($element, $attrs.loadingClass);
          }
          $element.html('');
        },

        addLoading: function() {
          if ($attrs.loadingClass) {
            $animate.addClass($element, $attrs.loadingClass);
          }
        }
      };

      $scope.$watch('securityContext.loggedIn', function(loggedIn) {
        var user = $scope.securityContext.user;

        if (loggedIn && user) {
          Profile.getContact(user.ContactId).then(function(data) {
            $scope.contact = data;
          });

          this.removeLoading();

          if (this.loginCtrl) {
            this.loginCtrl.hide();
          }

          this.profileElement = this.profileTemplate($scope);
          $element.append(this.profileElement);

        } else if (loggedIn === false) {
          this.removeLoading();
          var parent = $element.parent();

          if (this.profileElement) {
            this.profileElement.remove();
          }
          if (this.loginCtrl) {
            this.loginCtrl.show(parent, $element);
          }

        } else if (loggedIn === null) {
          if (this.loginCtrl) {
            this.loginCtrl.hide();
          }
          if (this.profileElement) {
            this.profileElement.remove();
          }
          this.addLoading();
        }
      });
    }

  };
});

