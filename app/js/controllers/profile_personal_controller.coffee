angular.module('crossroads')

.controller "ProfilePersonalCtrl", ($scope, $http, Contact, $rootScope) ->
  Contact.getContact()
    .then((data) ->
      $scope.contact = data
  )
  $scope.tmp = '123'
