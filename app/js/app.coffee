angular.module("crossroads",
  [
    'ngCookies',
    'ngStorage',
    'crdsAuth',
    'crdsSecurityContext',
    'angular-growl',
    'ui.bootstrap',
    'crds-ajax-form',
    'crdsProfile',
    'fitVids', 
    'plangular'
  ])

.config (growlProvider, $locationProvider, SecurityContextProvider) ->
  $locationProvider.html5Mode(true)
  growlProvider.globalPosition 'top-center'
  growlProvider.globalTimeToLive 6000
  growlProvider.globalDisableIcons true

  SecurityContextProvider.setSessionMinutes(30)

.run () ->
  return

.controller "AppCtrl", ($rootScope, $log, growl)->

  #
  # Event listeners for notifications that will trigger "Growl" style alerts
  #
  $rootScope.$on 'notify.success', (event, message) ->
    growl.success lookup(message)

  $rootScope.$on 'notify.info', (event, message) ->
    growl.info lookup(message)

  $rootScope.$on 'notify.warning', (event, message) ->
    growl.warning lookup(message)

  $rootScope.$on 'notify.error', (event, message) ->
    growl.error lookup(message)

  lookup = (messageKey) ->
    switch messageKey
      when "form.success" then return "Your request has been submitted successfully"
      when "form.validation.error" then return "Your request has errors"
      when "form.server.error" then return "An error has occurred"
      else return messageKey

  return
