crds-ng-secure-user
===================

SecureUser AngularJS module providing load and store current user using application-supplied authentication implementation.
All access to the authenticated user should pass through the SecureUser injected class or manipulate the $rootScope.secureUser

## Bower Install

    bower install crds-ng-secure-user

## Login and Logout Scenarios
This module addresses the possible scenarios for logged in and user authentication states for both a page-reload and intra-page login/logout

* Page has reloaded and no initial state is known about the current user
    * Server may respond that user is logged in
    * Server may respond that user is logged out
* Page has reloaded and the current user is found in Local Storage
    * Server may confirm that user is logged in
    * Server may respond that user is actually logged out
    * Local Storage session may expire and user must be logged out locally and on server
* Anonymous user clicks an Ajax Login button on the page:
    * Server may confirm that user is logged in, then retrieves current user data
    * Server may not authenticate user
* Authenticated user clicks an Ajax Logout button on the page:
    * User is removed from Local Storage and logged out from the Server
    
## API
### Fields

| Field    | Description |
|----------|-------------|
| user     | An object representing the user data retrieved from the CurrentUser API call  |
| userId   | The User ID embedded in the CurrentUser API call response  |
| loggedIn | This acts as a ternary value: **null** - User state not determined, **true** - User is logged in, **false** - User is not logged in   |

### Methods
| Method | Description |
|--------|-------------|
| SecureUser.loadCurrentUser() | Attempt to get the User from Local Storage as well as calling the CurrentUser API call.  This is automatically called in the module .run() function |
| SecureUser.login(username, password) | Call the Auth.login method and store the results in Local Storage and $rootScope.currentUser |
| SecureUser.logout() | Call Auth.logout, clear the Local Storage and $rootScope.currentUser |

## How to Use
Demo page source: [server/static/index.html](https://github.com/crdschurch/crds-ng-secure-user/blob/master/server/static/index.html)

### Include the module

```javascript   
angular.module("app", ["crdsSecureUser"])
```
 
### Including a custom Authentication implementation
Note that the SecureUser module expects an authentication implementation to also be an injectable dependency of the application
using the dependency name **"crdsAuth"** and injecting **"Auth"**.  The Secure User module does not provide its own auth implementation. 

### Including the Local Storage module
The SecureUser module uses [ngStorage](https://github.com/gsklee/ngStorage) to access Local Storage to persist the 
logged in users between page reloads.  The user's login status is than validated with the server after a reload.

```javascript   
angular.module("app", ["crdsSecureUser", "crdsAuth", "ngStorage"])
```
    
## Use the SecureUser service 

### Display information about the authenticated user
```html
<ul ng-show="secureUser.user">
    <li>User Id: {{secureUser.userId}}</li>
    <li>First Name: {{secureUser.user.firstName}}</li>
    <li>Last Name: {{secureUser.user.lastName}}</li>
</ul>
```

### Login and Logout ###    
Inject SecureUser into a Login Controller to trigger login and logout actions

```javascript    
.controller("LoginCtrl", function ($scope, SecureUser) {
    $scope.login = function() {
        console.log("User logs in");
        SecureUser.login($scope.username, $scope.password);
    };

    $scope.logout = function() {
        console.log("User logs out");
        SecureUser.logout();
    };
});
```

### Load the Current User ###
This retrieves the current user from Local Storage and initiates a server call to the CurrentUser API method.
This is automatically invoked by the SecureUser module in a run() function

```javascript
.run(function (SecureUser) {
    SecureUser.loadCurrentUser();
})
```

### Set the Session Timeout for the user in Local Storage
Use a "config" call on your application to set the timeout (default: 30 minutes)

```javascript   
.config(function (SecureUserProvider) {
    SecureUserProvider.setSessionMinutes(5);
})
```    
    
## How to build and test locally
### Install Build Dependencies
    npm install
    bower install

### Execute the buildfile and watch tasks
    gulp 
    
### View test page at
    http://localhost:3000
    
### Build the distribution
    gulp build
    
Minified and Debug versions copied to:

* dist/crds-ng-secure-user.js
* dist/crds-ng-secure-user.min.js


