angular.module("crossroads", ["ngCookies", 'ngAnimate', 'mgcrea.ngStrap', 'angular-growl'])

.run (Auth) ->
  # Auth.authenticate()
  return

.config (growlProvider) ->
  growlProvider.globalPosition 'top-center'
  growlProvider.globalTimeToLive 6000
  growlProvider.globalDisableIcons true

.controller "AppCtrl", ($scope, $log, growl)->

  #
  # Event listeners for notifications that will trigger "Growl" style alerts
  #
  $scope.$on 'notify.success', (event, message) ->
    growl.success message

  $scope.$on 'notify.info', (event, message) ->
    growl.info message

  $scope.$on 'notify.warning', (event, message) ->
    growl.warning message

  $scope.$on 'notify.error', (event, message) ->
    growl.error message

  return
