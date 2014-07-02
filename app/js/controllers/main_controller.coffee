angular.module('crossroads')

.controller "MainCtrl", (Menu, $rootScope) ->
  @menus = Menu.menuData
  @toggleMenu = ->
    Menu.toggleMobileDisplay()

  return
