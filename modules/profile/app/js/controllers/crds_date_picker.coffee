angular.module("crdsProfile")
.controller "crdsDatePickerCtrl", ($scope) ->

  console.log "date picker controller"

  $scope.today = ->
    $scope.dt = new Date()
    return

  $scope.clear = ->
    $scope.dt = null
    return

  $scope.open = ($event) ->
    $event.preventDefault()
    $event.stopPropagation()
    $scope.opened = true
    return

  $scope.dateOptions =
    formatYear: "yy"
    startingDay: 1
    showWeeks: false

  $scope.today()
