angular.module('crossroads')

.controller "ProfilePersonalCtrl", ($scope, $http, Contact, $rootScope) ->

  Contact.getMaritalStatusValues()
    .then((data) ->
      $scope.maritalstatusVals = data
  )

  Contact.getGenderValues()
    .then((data) ->
      $scope.genders = data
  )

  # hard coded until we can pull currentUser from rootscope with ContactId
  # value should be in $rootScope.currentUser.ContactId
  # but $rootScope.currentUser isn't available yet, when we get here
  # Contact.getContact(2)
  #   .then((data) ->
  #     $scope.contact = data
  # )

  # stop gap, need to wait for contact id to be available
  $rootScope.$on 'currentUser:available', ->
    Contact.getContact($rootScope.currentUser.ContactId)
      .then((data) ->
        $scope.contact = data
    )

  $scope.submit = ->
    console.log 'submit email: ' + $scope.contact.emailaddress.value
