angular.module "crossroads"
.controller "TonyCtrl", ($scope, $rootScope, $data) ->
  console.log "TonyCtrl Start"

  $rootScope.$watch "ministryPlatform", (context) ->
    console.log "root scope watch returned: #{context}"
    return if context is null
    localContext = context
    console.log "bbbbbbbb"
    # getContact("abc")
    id = 312556
    console.log "Query Household"
    queryPromise = localContext.Households.single ((data) ->
      data.Household_ID is @Id
    ),
      Id: id

    queryPromise.then (data) ->
      console.log('Tony Ctrl - Retrieved Data: ', data)

  console.log "TonyCtrl End"

.controller "JaydataHouseholdCtrl", ($scope, $data, $timeout) ->
  console.log "JaydataHouseholdCtrl initialized"

  ministryPlatform = null
  savedData = null
  $scope.ready = { jaydata: false }
  $scope.status = "Initializing Jaydata Context"

  # Ministry Platform API Get the Contact when the controller is initialized
  # TODO: This service initialization should either be done at App startup OR as a Gulp build task
  $data.initService('/api/ministryplatformapi/DataService.svc')
  .then (context) ->
    ministryPlatform = context

    id = 312556
    console.log "Query Household"
    queryPromise = ministryPlatform.Households.single ((data) ->
      data.Household_ID is @Id
    ),
      Id: id

    $scope.$apply ->
      $scope.status = "Querying Household: " + id

    queryPromise.then (data) ->
      console.log('Retrieved Data: ', data)
      savedData = data
      $scope.$apply ->
        $scope.status = "Retrieved Household: " + id
        $scope.ready.jaydata = true

  # Send the PATCH request to Ministry Platform through the API
  $scope.click = () ->
    console.log "Attempting contact save"
    $scope.ready.jaydata = false

    ministryPlatform.Households.attach savedData
    name = 'A Test Household ' + (Math.floor((Math.random() * 100) + 1))
    savedData['Household_Name'] = name

    savePromise = ministryPlatform.saveChanges()
    savePromise.then((data) ->
      console.log "Saved ", data
      $scope.ready.jaydata = true
      $scope.status = "Saved Household #{savedData.Household_ID} with name: '#{name}'"
    , (error) ->
      console.log "Error ", error
      $scope.ready.jaydata = true
    )
