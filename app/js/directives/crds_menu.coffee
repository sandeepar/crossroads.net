angular.module('crossroads')

.directive "crdsMenu", ->
  controller: "crdsMenuCtrl",
  templateUrl: "/templates/crdsMenu.html"
  require: "?authForm"
  priority: 99
  scope:
    menus: "=crdsMenu"
    currentUser: "="
