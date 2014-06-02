crossroads = angular.module "crossroads", ["crossroadsMenu"]

crossroads.controller "MainCtrl", ($window) ->
  @menus = $window.menuData
  return

$(document).ready ->
  menu = $('#sp-nav, #sp-page')

  $('.navbar-toggle').on 'click', ->
    menu.toggleClass('show')
