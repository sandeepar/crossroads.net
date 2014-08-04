angular.module("crdsProfile")
.controller "crdsProfilePersonal", ($scope, SecurityContext, Profile) ->

  console.log "profile personal controller1"

  personalProfile =

  #Load look up values from back-end service
  # lookupValues()

  lookupValues: ->
    # Get Values for Marital Status drop down
    console.log('lookupValues')
    Profile.getMaritalStatusValues()
      .then((data) ->
        $scope.maritalstatusVals = data
      )

    Profile.getGenderValues()
      .then((data) ->
        $scope.genders = data
      )

  console.log "profile personal controller2"
  personalProfile.lookupValues()


  $scope.savePersonal = (data) ->
    Profile.saveContact(data)
      .then( ->
        console.log 'personal saved'
        return
      )
