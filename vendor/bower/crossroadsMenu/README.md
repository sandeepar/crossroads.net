## Crossroads Menu directive

Usage:

```javascript>
function MainCtrl($scope) {
  $scope.menus = [
    {
      title: "First menu",
      items: [{title: "Thing 1"}, {title: "Thing 2"}]
    }
  ];
}
```
```html
<div crds-menu="menus"></div>
```
