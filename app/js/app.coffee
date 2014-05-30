crossroads = angular.module "crossroads", ["crossroadsMenu", 'mgcrea.ngStrap']

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return
