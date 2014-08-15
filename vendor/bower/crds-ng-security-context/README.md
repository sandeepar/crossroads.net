crds-ng-security-context
===================

SecurityContext AngularJS module providing load and store current user using application-supplied authentication implementation.
All access to the authenticated user should pass through the SecurityContext injected class or manipulate the $rootScope.securityContext.  

The SecurityContext depends on an "Auth" service being injected from a module named "crdsAuth", but makes no assumptions about the specific implementation
 of the Auth service.  The Auth service must provide a specific API which will be utilized by the SecurityContext but the 
 "crdsAuth" module may be implemented as desired by the parent application.

## Bower Install

    bower install crds-ng-security-context

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

## SecurityContext API
### Fields

| Field    | Description |
|----------|-------------|
| user     | An object representing the user data retrieved from the CurrentUser API call  |
| userId   | The User ID embedded in the CurrentUser API call response  |
| loggedIn | This acts as a ternary value: **null** - User state not determined, **true** - User is logged in, **false** - User is not logged in   |

### Methods
| Method | Description |
|--------|-------------|
| SecurityContext.loadCurrentUser() | Attempt to get the User from Local Storage as well as calling the CurrentUser API call.  This is automatically called in the module .run() function |
| SecurityContext.login(username, password) | Call the Auth.login method and store the results in Local Storage and $rootScope.currentUser |
| SecurityContext.logout() | Call Auth.logout, clear the Local Storage and $rootScope.currentUser |

## "crdsAuth" module Auth Service Interface
Implementation of the Auth service must provide the following methods 

### Methods
| Method | Return | Description |
|--------|--------|-------------|
| SecurityContext.login(username, password) | promise | Resolve the promise if authentication successful; Reject the promise if authentication fails |
| SecurityContext.loadCurrentUser() | promise | Resolve the promise with the user data if the server has an authenticated user; Reject the promise if not authenticated |
| SecurityContext.logout() | none | Log out the user on the server |

### User Data
The only required field in the user data is ContactID which should be the unique id for that user.  Other user data is simply passed through

e.g.

    {
        ContactId: "abc123",
        FirstName: "John",
        LastName: "Doe"
    }

## How to Use
Demo page source: [server/static/index.html](https://github.com/crdschurch/crds-ng-security-context/blob/master/server/static/index.html)

### Include the module

```javascript
angular.module("app", ["crdsSecurityContext"])
```

### Including a custom Authentication implementation
Note that the SecurityContext module expects an authentication implementation to also be an injectable dependency of the application
using the dependency name **"crdsAuth"** and injecting **"Auth"**.  The Secure User module does not provide its own auth implementation.

### Including the Local Storage module
The SecurityContext module uses [ngStorage](https://github.com/gsklee/ngStorage) to access Local Storage to persist the
logged in users between page reloads.  The user's login status is than validated with the server after a reload.

```javascript
angular.module("app", ["crdsSecurityContext", "crdsAuth", "ngStorage"])
```

## Use the SecurityContext service

### Display information about the authenticated user
```html
<ul ng-show="securityContext.user">
    <li>User Id: {{securityContext.userId}}</li>
    <li>First Name: {{securityContext.user.FirstName}}</li>
    <li>Last Name: {{securityContext.user.LastName}}</li>
</ul>
```

### Login and Logout ###
Inject SecurityContext into a Login Controller to trigger login and logout actions

```javascript
.controller("LoginCtrl", function ($scope, SecurityContext) {
    $scope.login = function() {
        console.log("User logs in");
        SecurityContext.login($scope.username, $scope.password);
    };

    $scope.logout = function() {
        console.log("User logs out");
        SecurityContext.logout();
    };
});
```

### Load the Current User ###
This retrieves the current user from Local Storage and initiates a server call to the CurrentUser API method.
This is automatically invoked by the SecurityContext module in a run() function

```javascript
.run(function (SecurityContext) {
    SecurityContext.loadCurrentUser();
})
```

### Set the Session Timeout for the user in Local Storage
Use a "config" call on your application to set the timeout (default: 30 minutes)

```javascript
.config(function (SecurityContextProvider) {
    SecurityContextProvider.setSessionMinutes(5);
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

* dist/crds-ng-security-context.js
* dist/crds-ng-security-context.min.js
