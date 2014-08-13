'use strict';

angular.module('crossroads')

.directive('authForm', function() {
  return {
    restrict: 'EA',
    templateUrl: '/templates/login.html',
    controller: 'LoginCtrl',
    priority: 0
  };
});
