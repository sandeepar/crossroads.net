angular.module('crossroads')

.directive "hideOnMobileMenu", (Menu)->

  link: (scope, element, attrs) ->
    scope.menu = Menu

    scope.$watch "menu.isMobileShowing", (isShowing) ->
      if scope.menu.isMobileShowing
        element.addClass("show")
      else
        element.removeClass("show")
