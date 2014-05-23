crossroads = angular.module "crossroads", ["crossroadsMenu"]

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return
