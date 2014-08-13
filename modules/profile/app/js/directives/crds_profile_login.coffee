angular.module("crdsProfile")
.directive "crdsProfileLogin", ($animate) ->
  return {
    require: [ '^crdsProfile', 'crdsProfileLogin' ]
    restrict: 'EA'
    scope: true
    terminal: true
    priority: 1000
    transclude: 'element'

    link: ($scope, $element, $attrs, controllers, $transclude) ->
      console.log "crdsProfileLogin link()"
      crdsProfileCtrl = controllers[0]
      crdsProfileLoginCtrl = controllers[1]

      crdsProfileCtrl.registerLogin crdsProfileLoginCtrl

      return

    controller: ($scope, $element, $attrs, $transclude) ->
      new class
        show: (parent, after) =>
          if !@loginElement
            $transclude (clone, newScope) =>
              @loginElement = clone
              $animate.enter clone, parent, after

        hide: =>
          if @loginElement
            $animate.leave @loginElement
            @loginElement = null
  }