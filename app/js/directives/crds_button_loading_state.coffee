#
# Directive to disable a button and set a loading label while a form is being submitted
#
#  Usage:
#   <button type="submit" class="btn btn-default" crds-loading="isLoading" crds-loading-text="Sending..." >Send</button>
#
angular.module 'crossroads'
.directive 'crdsLoadingText', ($timeout, $log) ->
  return {
  restrict: 'A'
  scope: {
    'crdsLoadingText': '@'
    'crdsLoading': '='
  }
  link: ($scope, $element, $attrs) ->
    # Get the starting values of the button label and disabled state
    baseText = $element.html()
    baseDisabled = $attrs.disabled

    # Watch the value of the defined scope loading variable
    # If the value is true, disable the button and show the loading text
    # If the value is false, enable the button and reset to the original button text
    $scope.$watch 'crdsLoading', (value) ->
      if value
        $attrs.$set 'disabled', true

        # First evaluate the crdsLoadingText value against the scope to determine
        #   if this is pulling the button text from the scope
        # Second, use the crdsLoadingText value as the button label if it did not evaluate as an expression
        text = $scope.$parent.$eval $scope.crdsLoadingText
        text = $scope.crdsLoadingText if !text
        $element.html text
      else
        # Reset the button to the original state
        $element.html baseText
        $attrs.$set 'disabled', baseDisabled

    # Watch for changes to the base disabled state that might happen during the form submission
    $scope.$parent.$watch $attrs.ngDisabled, (value) ->
      $log.log "Button disabled: #{value}"
      baseDisabled = value
  }