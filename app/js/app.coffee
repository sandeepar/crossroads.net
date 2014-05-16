crossroads = angular.module "crossroads", ["crossroadsMenu"]

crossroads.controller "MainCtrl", ($scope)->
  $scope.menus = [
    {
      title: "hi"
      items: [
        { title: "thing" }
      ]
    }
  ]
