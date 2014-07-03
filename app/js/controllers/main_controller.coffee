angular.module('crossroads')

.controller "MainCtrl", (Menu) ->
  @menus = Menu.menuData
  @toggleMenu = ->
    Menu.toggleMobileDisplay()

  return
