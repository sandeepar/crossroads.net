(function() {
  angular.module("crdsSecurityContext", ["crdsAuth"]);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsSecurityContext").run(function(SecurityContext) {
    return SecurityContext.loadCurrentUser();
  }).provider("SecurityContext", function() {
    var sessionMinutes;
    console.log("SecurityContext provider factory");
    sessionMinutes = 30;
    this.setSessionMinutes = function(value) {
      return sessionMinutes = value;
    };
    this.$get = function($q, $rootScope, $localStorage, Auth) {
      var clear, getCurrentUser, securityContext;
      console.log("SecurityContext.$get, using sessionMinutes " + sessionMinutes);
      securityContext = new ((function() {
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
          localUser = $localStorage.securityContext;
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
          var deferred, promise;
          clear();
          this.loggedIn = null;
          deferred = $q.defer();
          promise = Auth.login(username, password);
          promise.then(function(data) {
            deferred.resolve(data);
            return getCurrentUser();
          }, function(error) {
            return deferred.reject(error);
          });
          return deferred.promise;
        };

        _Class.prototype.logout = function() {
          clear();
          return Auth.logout();
        };

        return _Class;

      })());
      $rootScope.securityContext = securityContext;
      getCurrentUser = function() {
        var promise;
        console.log("SecurityContext.getCurrentUser");
        promise = Auth.getCurrentUser();
        return promise.then(function(user) {
          if (user) {
            console.log("Received current user from Ministry Platform");
            securityContext.user = user;
            securityContext.userId = user.id;
            securityContext.loggedIn = true;
            securityContext.seenDate = new Date();
            $localStorage.securityContext = user;
            return $localStorage.seenDate = securityContext.seenDate;
          } else {
            console.log("No current user logged in to Ministry Platform");
            return clear();
          }
        });
      };
      clear = function() {
        securityContext.userId = null;
        securityContext.user = null;
        securityContext.loggedIn = false;
        securityContext.seenDate = null;
        if ($localStorage.securityContext) {
          delete $localStorage.securityContext;
        }
        if ($localStorage.seenDate) {
          return delete $localStorage.seenDate;
        }
      };
      return securityContext;
    };
  });

}).call(this);
