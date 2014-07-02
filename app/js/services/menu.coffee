angular.module('crossroads')

.factory "Menu", ($window)->
  class Menu
    constructor: (@menuData) ->

    toggleMobileDisplay: ->
      @isMobileShowing = !@isMobileShowing

  new Menu($window.menuData)
