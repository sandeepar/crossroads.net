angular.module('crossroads')

.controller "MainCtrl", ($window, $rootScope) ->
  @menus = $window.menuData
  @toggleMenu = ->
  	$rootScope.$emit 'menu:toggle'
  return
