angular.module('crossroads')

.directive 'randomBlock', ->
  restrict: 'C'
  compile: (telement, tattrs) ->
    children = _.map telement.children(), (child) ->
      angular.element(child)

    _.each children, (child) ->
      child.addClass('hidden')

    visible = _.sample(children)
    visible.removeClass('hidden')
