angular.module('crossroads')

.factory "Menu", ($window)->
  class Menu
    constructor: (@menuData) ->

    toggleMobileDisplay: ->
      @isMobileShowing = !@isMobileShowing

    collapsed: (index) -> index != @selectedMenuItem

    toggleMenuItem: (index) ->
      if @collapsed(index)
        @selectedMenuItem = index
      else
        @selectedMenuItem = null

  new Menu($window.menuData)
