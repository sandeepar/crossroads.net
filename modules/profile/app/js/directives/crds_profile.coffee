angular.module("crdsProfile")
.directive "crdsProfile", ($timeout, $animate, $compile, $templateCache) ->
  return {
    restrict: 'EA'
    scope: true

    controller: ($scope, $element, $attrs, Profile) ->

      new class
        constructor: ->

          console.log "Profile Controller"
          @addLoading()

          # Load the profile template
          template = $templateCache.get 'profile/app/templates/profile.html'
          @profileTemplate = $compile template

          # Watch for changes to the current user loggedIn flag
          $scope.$watch "securityContext.loggedIn", (loggedIn) =>
            user = $scope.securityContext.user
            if loggedIn and user
              console.log "crdsProfile - Current user has changed to #{user.FirstName}"

              Profile.getContact(user.ContactId).then (data) ->
                $scope.contact = data

              @removeLoading()

              @loginCtrl.hide() if @loginCtrl
              @profileElement = @profileTemplate($scope)
              $element.append(@profileElement)

            else if loggedIn == false
              console.log "crdsProfile - User has now logged out"
              @removeLoading()

              parent = $element.parent()

              @profileElement.remove() if @profileElement
              @loginCtrl.show parent, $element if @loginCtrl

            else if loggedIn == null
              console.log "crdsProfile - User is in loading state"
              @loginCtrl.hide() if @loginCtrl
              @profileElement.remove() if @profileElement
              @addLoading()




        registerLogin: (loginCtrl) =>
          console.log "Registered login controller"
          @loginCtrl = loginCtrl

        removeLoading: ->
          $animate.removeClass $element, $attrs.loadingClass if $attrs.loadingClass
          $element.html ''

        addLoading: ->
          $animate.addClass $element, $attrs.loadingClass if $attrs.loadingClass
  }
