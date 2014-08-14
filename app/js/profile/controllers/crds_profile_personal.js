'use strict';

angular.module('crdsProfile')

.controller('crdsProfilePersonal', function($scope, SecurityContext, Profile) {

  Profile.getMaritalStatusValues().then(function(data) {
    $scope.maritalStatuses = data;
  });

  Profile.getGenderValues().then(function(data) {
    $scope.genders = data;
  });

  $scope.savePersonal = function(data) {
    Profile.saveContact(data);
  };
});
