angular.module("crdsProfile").controller "crdsProfilePersonal", ($scope, SecurityContext, Profile) ->
  Profile.getMaritalStatusValues().then (data) ->
    $scope.maritalStatuses = data

  Profile.getGenderValues().then (data) ->
    $scope.genders = data

  $scope.savePersonal = (data) ->
    Profile.saveContact(data)
