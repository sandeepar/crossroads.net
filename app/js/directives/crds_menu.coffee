angular.module('crossroads')

.directive "crdsMenu", ($rootScope) ->
  controller: "crdsMenuCtrl",
  templateUrl: "/templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"
    currentUser: "="
