angular.module('crossroads')

.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return
