(function() {
  angular.module("crdsSecurityContext", []);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsSecurityContext").run(function(SecurityContext) {
    return SecurityContext.loadCurrentUser();
  }).provider("SecurityContext", function() {
    var authImplName, sessionMinutes;
    authImplName = "Auth";
    sessionMinutes = 30;
    this.getSessionMinutes = function() {
      return sessionMinutes;
    };
    this.setSessionMinutes = function(value) {
      return sessionMinutes = value;
    };
    this.setAuthImplName = function(value) {
      return authImplName = value;
    };
    this.$get = function($injector, $q, $rootScope, $localStorage, $log) {
      var Auth, clear, getCurrentUser, securityContext;
      Auth = $injector.get(authImplName);
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
                this.userId = localUser.ContactId;
                this.loggedIn = true;
                this.seenDate = new Date();
              } else {
                $log.debug("User session has expired");
                clear();
              }
            } else {
              $log.debug("User session date is invalid");
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
        promise = Auth.getCurrentUser();
        return promise.then(function(user) {
          if (user) {
            $log.debug("Received current user from Ministry Platform");
            securityContext.user = user;
            securityContext.userId = user.ContactId;
            securityContext.loggedIn = true;
            securityContext.seenDate = new Date();
            $localStorage.securityContext = user;
            return $localStorage.seenDate = securityContext.seenDate;
          } else {
            $log.debug("No current user logged in to Ministry Platform");
            return clear();
          }
        }, function(error) {
          $log.debug("No current user logged in to Ministry Platform");
          return clear();
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
