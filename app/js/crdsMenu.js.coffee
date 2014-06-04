angular.module("crossroadsMenu", ["crdsAuth"]).directive "crdsMenu", ->
  templateUrl: "templates/crdsMenu.html"
  require: "authForm"
  scope:
    menus: "=crdsMenu"
