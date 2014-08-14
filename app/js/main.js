'use strict';

angular.module('crossroads',
    [
      'templates',
      'ngCookies',
      'ngStorage',
      'crdsAuth',
      'crdsSecurityContext',
      'angular-growl',
      'ui.bootstrap',
      'crds-ajax-form',
      'crdsProfile',
      'fitVids',
      'plangular',
      'duScroll',
      'ui.scrollfix'
    ]

).config(function(growlProvider, $locationProvider, SecurityContextProvider) {
  $locationProvider.html5Mode(true);
  growlProvider.globalPosition('top-center');
  growlProvider.globalTimeToLive(6000);
  growlProvider.globalDisableIcons(true);
  SecurityContextProvider.setSessionMinutes(30);

});
