angular.module('crossroads')

.controller "ProfilePersonalCtrl", ($scope, $http, Contact, $rootScope) ->
  # how can we get these values from ministry platform api?
  # these values are guesses, probably not correct
  $scope.maritalstati = [
    {id: null},
    {id: 7, value: 'Dating'},
    {id: 3, value: 'Divorced'},
    {id: 2, value: 'Married'},
    {id: 5, value: 'Partnered'},
    {id: 6, value: 'Separated'},
    {id: 1, value: 'Single'},
    {id: 4, value: 'Widowed'},
  ]

  Contact.getSomething()

  Contact.getContact()
    .then((data) ->
      $scope.contact = data
  )
