  crossroads = angular.module "crossroads", ["crossroadsMenu"]

  crossroads.controller "MainCtrl", ($scope)->
    $scope.menus = 
      headings: [
        title: "My Crossroads"
        link: "#"
        items : [
          {title: "Dashboard",  link: "#"},
          {title: "Profile", link: "#"},
          {title: "Giving History", link: "#" }]
      ]
