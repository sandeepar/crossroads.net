angular.module("crossroads", ["ngCookies", 'angular-growl', 'ui.bootstrap', 'crds-ajax-form'])

.config (growlProvider) ->
  growlProvider.globalPosition 'top-center'
  growlProvider.globalTimeToLive 6000
  growlProvider.globalDisableIcons true

.run (Auth) ->
  Auth.getCurrentUser()
  return

.controller "AppCtrl", ($rootScope, $log, growl)->

  #
  # Event listeners for notifications that will trigger "Growl" style alerts
  #
  $rootScope.$on 'notify.success', (event, message) ->
    growl.success message

  $rootScope.$on 'notify.info', (event, message) ->
    growl.info message

  $rootScope.$on 'notify.warning', (event, message) ->
    growl.warning message

  $rootScope.$on 'notify.error', (event, message) ->
    growl.error message

  return
