angular.module('crossroads')

.directive "crdsMenu", ->
  controller: "crdsMenuCtrl",
  templateUrl: "/templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"
