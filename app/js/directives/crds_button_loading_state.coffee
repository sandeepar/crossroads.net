angular.module 'crossroads'
.directive 'crdsLoadingText', ($timeout, $log) ->
  return {
  restrict: 'A'
  scope: {
    'crdsLoadingText': '@'
    'crdsLoading': '='
  }
  link: ($scope, $element, $attrs) ->
    baseText = $element.html()
    baseDisabled = $attrs.disabled

    $scope.$watch 'crdsLoading', (value) ->
      if value
        $attrs.$set 'disabled', true

        text = $scope.$parent.$eval $scope.crdsLoadingText
        text = $scope.crdsLoadingText if !text
        $element.html text
      else
        $element.html baseText
        $attrs.$set 'disabled', baseDisabled

    $scope.$parent.$watch $attrs.ngDisabled, (value) ->
      $log.log "Button disabled: #{value}"
      baseDisabled = value
  }