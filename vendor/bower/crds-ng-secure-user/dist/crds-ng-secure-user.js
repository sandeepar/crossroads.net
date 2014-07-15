(function() {
  angular.module("crdsSecureUser", ["crdsAuth"]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsSecureUser").run(function(SecureUser) {
    return SecureUser.loadCurrentUser();
  }).provider("SecureUser", function() {
    var sessionMinutes;
    console.log("SecureUser provider factory");
    sessionMinutes = 30;
    this.setSessionMinutes = function(value) {
      return sessionMinutes = value;
    };
    this.$get = function($rootScope, $localStorage, Auth) {
      var clear, getCurrentUser, secureUser;
      console.log("SecureUser.$get, using sessionMinutes " + sessionMinutes);
      secureUser = new ((function() {
        function _Class() {
          this.login = __bind(this.login, this);
          this.loadCurrentUser = __bind(this.loadCurrentUser, this);
          this.userId = null;
          this.user = null;
          this.loggedIn = null;
          this.seenDate = null;
        }

        _Class.prototype.loadCurrentUser = function() {
          var elapsed, localUser, seenDate;
          localUser = $localStorage.secureUser;
          if (localUser) {
            seenDate = new Date($localStorage.seenDate);
            if (!isNaN(seenDate.getTime())) {
              elapsed = (new Date().getTime() - seenDate.getTime()) / 1000 / 60;
              if (elapsed <= sessionMinutes) {
                this.user = localUser;
                this.userId = localUser.id;
                this.loggedIn = true;
                this.seenDate = new Date();
              } else {
                console.log("User session has expired");
                clear();
              }
            } else {
              console.log("User session date is invalid");
              clear();
            }
          }
          getCurrentUser();
        };

        _Class.prototype.login = function(username, password) {
          var promise;
          clear();
          this.loggedIn = null;
          promise = Auth.login(username, password);
          promise.then(getCurrentUser);
        };

        _Class.prototype.logout = function() {
          clear();
          return Auth.logout();
        };

        return _Class;

      })());
      $rootScope.secureUser = secureUser;
      getCurrentUser = function() {
        var promise;
        console.log("SecureUser.getCurrentUser");
        promise = Auth.getCurrentUser();
        return promise.then(function(user) {
          if (user) {
            console.log("Received current user from Ministry Platform");
            secureUser.user = user;
            secureUser.userId = user.id;
            secureUser.loggedIn = true;
            secureUser.seenDate = new Date();
            $localStorage.secureUser = user;
            return $localStorage.seenDate = secureUser.seenDate;
          } else {
            console.log("No current user logged in to Ministry Platform");
            return clear();
          }
        });
      };
      clear = function() {
        secureUser.userId = null;
        secureUser.user = null;
        secureUser.loggedIn = false;
        secureUser.seenDate = null;
        if ($localStorage.secureUser) {
          delete $localStorage.secureUser;
        }
        if ($localStorage.seenDate) {
          return delete $localStorage.seenDate;
        }
      };
      return secureUser;
    };
  });

}).call(this);
