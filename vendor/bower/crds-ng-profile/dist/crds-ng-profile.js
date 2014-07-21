(function() {
  angular.module("crdsProfile", ["crdsSecurityContext"]);

}).call(this);

(function() {
  angular.module("crdsProfile").controller("crdsDatePickerCtrl", function($scope) {
    console.log("date picker controller");
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.clear = function() {
      $scope.dt = null;
    };
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: "yy",
      startingDay: 1,
      showWeeks: false
    };
    return $scope.today();
  });

}).call(this);

(function() {
  angular.module("crdsProfile").controller("crdsProfilePersonal", function($scope, SecurityContext, Profile) {
    var personalProfile;
    console.log("profile personal controller1");
    personalProfile = {
      lookupValues: function() {
        console.log('lookupValues');
        Profile.getMaritalStatusValues().then(function(data) {
          return $scope.maritalstatusVals = data;
        });
        return Profile.getGenderValues().then(function(data) {
          return $scope.genders = data;
        });
      }
    };
    console.log("profile personal controller2");
    return personalProfile.lookupValues();
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsProfile").directive("crdsProfile", function($timeout, $animate, $compile, $templateCache) {
    return {
      restrict: 'EA',
      scope: true,
      controller: function($scope, $element, $attrs, Profile) {
        return new ((function() {
          function _Class() {
            this.registerLogin = __bind(this.registerLogin, this);
            console.log("Profile Controller");
            this.addLoading();
            this.profileTemplate = $compile($templateCache.get('profile.html'));
            $scope.$watch("securityContext.loggedIn", (function(_this) {
              return function(loggedIn) {
                var parent, user;
                user = $scope.securityContext.user;
                if (loggedIn && user) {
                  console.log("crdsProfile - Current user has changed to " + user.FirstName);
                  Profile.getContact(user.ContactId).then(function(data) {
                    return $scope.contact = data;
                  });
                  _this.removeLoading();
                  if (_this.loginCtrl) {
                    _this.loginCtrl.hide();
                  }
                  _this.profileElement = _this.profileTemplate($scope);
                  return $element.append(_this.profileElement);
                } else if (loggedIn === false) {
                  console.log("crdsProfile - User has now logged out");
                  _this.removeLoading();
                  parent = $element.parent();
                  if (_this.profileElement) {
                    _this.profileElement.remove();
                  }
                  if (_this.loginCtrl) {
                    return _this.loginCtrl.show(parent, $element);
                  }
                } else if (loggedIn === null) {
                  console.log("crdsProfile - User is in loading state");
                  if (_this.loginCtrl) {
                    _this.loginCtrl.hide();
                  }
                  if (_this.profileElement) {
                    _this.profileElement.remove();
                  }
                  return _this.addLoading();
                }
              };
            })(this));
          }

          _Class.prototype.registerLogin = function(loginCtrl) {
            console.log("Registered login controller");
            return this.loginCtrl = loginCtrl;
          };

          _Class.prototype.removeLoading = function() {
            if ($attrs.loadingClass) {
              $animate.removeClass($element, $attrs.loadingClass);
            }
            return $element.html('');
          };

          _Class.prototype.addLoading = function() {
            if ($attrs.loadingClass) {
              return $animate.addClass($element, $attrs.loadingClass);
            }
          };

          return _Class;

        })());
      }
    };
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("crdsProfile").directive("crdsProfileLogin", function($animate) {
    return {
      require: ['^crdsProfile', 'crdsProfileLogin'],
      restrict: 'EA',
      scope: true,
      terminal: true,
      priority: 1000,
      transclude: 'element',
      link: function($scope, $element, $attrs, controllers, $transclude) {
        var crdsProfileCtrl, crdsProfileLoginCtrl;
        console.log("crdsProfileLogin link()");
        crdsProfileCtrl = controllers[0];
        crdsProfileLoginCtrl = controllers[1];
        crdsProfileCtrl.registerLogin(crdsProfileLoginCtrl);
      },
      controller: function($scope, $element, $attrs, $transclude) {
        return new ((function() {
          function _Class() {
            this.hide = __bind(this.hide, this);
            this.show = __bind(this.show, this);
          }

          _Class.prototype.show = function(parent, after) {
            if (!this.loginElement) {
              return $transclude((function(_this) {
                return function(clone, newScope) {
                  _this.loginElement = clone;
                  return $animate.enter(clone, parent, after);
                };
              })(this));
            }
          };

          _Class.prototype.hide = function() {
            if (this.loginElement) {
              $animate.leave(this.loginElement);
              return this.loginElement = null;
            }
          };

          return _Class;

        })());
      }
    };
  });

}).call(this);

(function() {
  angular.module("crdsProfile").factory("Profile", function($http, $rootScope) {
    var profile;
    return profile = {
      getContact: function(contactId) {
        console.log("getContact");
        return $http.get("/getContact/" + contactId).then((function(response) {
          var data;
          if (typeof response.data === 'object') {
            return data = {
              emailaddress: profile.extractFieldValue(response.data, 'Email_Address'),
              firstname: profile.extractFieldValue(response.data, 'First_Name'),
              middlename: profile.extractFieldValue(response.data, 'Middle_Name'),
              lastname: profile.extractFieldValue(response.data, 'Last_Name'),
              maidenname: '',
              nickname: profile.extractFieldValue(response.data, 'Nickname'),
              mobile: profile.extractFieldValue(response.data, 'Mobile_Phone'),
              mobileprovider: '',
              birthdate: profile.extractFieldValue(response.data, 'Date_of_Birth'),
              maritalstatus: profile.extractFieldValue(response.data, 'Marital_Status_ID'),
              gender: profile.extractFieldValue(response.data, 'Gender_ID_Text'),
              employer: profile.extractFieldValue(response.data, 'Company_Name'),
              startattending: profile.extractFieldValue(response.data, 'Anniversary_Date')
            };
          } else {
            return null;
          }
        }), function(response) {
          return null;
        });
      },
      getMaritalStatusValues: function() {
        console.log("getMaritalStatusValues");
        return $http.get('getMaritalStatus').then((function(response) {
          var data;
          if (typeof response.data === 'object') {
            return data = profile.formatValues(response.data);
          } else {
            return null;
          }
        }), function(response) {
          return null;
        });
      },
      getGenderValues: function() {
        console.log("getGenderValues");
        return $http.get('getGenders').then((function(response) {
          var data;
          if (typeof response.data === 'object') {
            return data = profile.formatValues(response.data);
          } else {
            return null;
          }
        }), function(response) {
          return null;
        });
      },
      formatValues: function(data) {
        var element, i, output;
        output = [];
        i = 0;
        while (i < data.length) {
          element = {
            id: data[i][0],
            value: data[i][1]
          };
          output.push(element);
          i++;
        }
        return output;
      },
      extractFieldValue: function(res, fieldName) {
        var i, key, mp, value;
        if (res.Fields && res.Data && res.Data[0]) {
          i = 0;
          while (i < res.Fields.length) {
            if (res.Fields[i].Name === fieldName && res.Fields[i].DataType !== 10) {
              key = res.Fields[i].Name;
              value = res.Data[0][res.Fields[i].Index];
              mp = {
                key: key,
                value: value
              };
              return mp;
            }
            if (res.Fields[i].Name === fieldName && res.Fields[i].DataType === 10) {
              key = res.Fields[i].Name;
              value = res.Data[0][res.Fields[i].Index];
              mp = {
                key: key,
                value: profile.extractDateValue(value)
              };
              return mp;
            }
            i++;
          }
        }
        return null;
      },
      extractDateValue: function(mpString) {
        var date, day, month, stringDate, unixTimestamp, year;
        if (!mpString) {
          return null;
        }
        unixTimestamp = mpString.match(/\((.*?)-/);
        if (unixTimestamp !== null) {
          date = new Date(Number(unixTimestamp[1]));
          year = date.getFullYear();
          month = date.getMonth() + 1;
          day = date.getDate();
          stringDate = "" + month + "/" + day + "/" + year;
          return stringDate;
        }
        return null;
      }
    };
  });

}).call(this);

angular.module("crdsProfile").run(["$templateCache", function($templateCache) {$templateCache.put("profile.html","<div class=\"row\">\n  <div class=\"col-sm-10 col-sm-offset-1\">\n    <h1>My Profile</h1>\n    <h2 class=\"subheading\">Hello, special you.  </h2>\n    <div class=\"profile-header\">\n      <div class=\"row\">\n        <div class=\"col-xs-3 col-sm-2\">\n          <a href=\"#\" class=\"profile-pic\">\n            <img class=\"profile-image pull-left img-square img-responsive\" src=\"//crossroads-media.s3.amazonaws.com/images/avatar.svg\" alt=\"Profile Default Photo\" />\n            <span class=\"change-photo\">Change Photo</span>\n          </a>\n        </div>\n        <div class=\"profile-desc col-xs-7 col-sm-9\">\n          <h3 class=\"profile-name\">Test User</h3>\n          <p class=\"lead\"><a href=\"#household\" data-toggle=\"tab\" class=\"edit-church-site\">Church Site <span class=\"glyphicon glyphicon-pencil\"></span></a></p>\n          <div class=\"col-sm-6 row\">\n            <div class=\"progress\">\n              <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\">\n                60%\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"profile-body col-sm-12 row\">\n\n      <tabset ng-init=\"set = {}\">\n        <tab heading=\"Personal\"><ng-include src=\" \'profile_personal.html\' \"></ng-include></tab>\n        <tab heading=\"Household\" class=\"hidden-xs\" active=\"set.showHousehold\"><ng-include src=\" \'profile_household.html\'\" ></ng-include></tab>\n        <tab heading=\"Account\"><ng-include src=\" \'profile_account.html\' \"></ng-include></tab>\n        <tab heading=\"Skills\" class=\"hidden-xs\" active=\"set.showSkills\"><ng-include src=\" \'profile_skills.html\' \"></ng-include></tab>\n        <tab heading=\"History\" class=\"hidden-xs\" active=\"set.showHistory\"><ng-include src=\" \'profile_history.html\' \"></ng-include></tab>\n        <li role=\"tab\" data-toggle=\"tab\" class=\"dropdown hidden-md hidden-lg hidden-sm dropdown-toggle\" data-toggle=\"dropdown\">\n          <a href=\"#\">More <span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\" role=\"menu\">\n            <li><a href=\"#\" ng-click=\"set.showHousehold = true\">Household</a></li>\n            <li><a href=\"#\" ng-click=\"set.showSkills = true\">Skills</a></li>\n            <li><a href=\"#\" ng-click=\"set.showHistory = true\">History</a></li>\n          </ul>\n        </li>\n      </tabset>\n    </div>\n  </div>\n");
$templateCache.put("profile_account.html","<form role=\"form\">\n\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"password\">Password</label>\n      <div class=\"input-group\">\n        <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"fields.password\" ng-if=\"!showPassword\" value=\"testpassword\" />\n        <input type=\"text\" class=\"form-control\" id=\"password-clear\" name=\"password\" ng-model=\"fields.password\" ng-if=\"showPassword\" value=\"testpassword\"/>\n        <span class=\"input-group-addon\">\n          <label>\n            <input type=\"checkbox\" ng-click=\"showPassword = !showPassword\"> Show\n          </label>\n        </span>\n      </div><!-- /input-group -->\n    </div>\n    <div class=\"form-group col-sm-12\">\n      <label class=\"block\">Email Communication</label>\n      <label class=\"radio-inline\">\n        <input type=\"radio\" name=\"subscription\" value=\"on\" checked=\"checked\"> On\n      </label>\n      <label class=\"radio-inline\">\n        <input type=\"radio\" name=\"subscription\" value=\"off\"> Off\n      </label>\n    </div>\n\n  </div>\n  <button class=\"btn btn-primary ladda-button\" data-style=\"expand-left\"><span class=\"ladda-label\">Save</span></button>\n</form>\n");
$templateCache.put("profile_history.html","<div class=\"history-timeline row\">\n  <ul class=\"timeline\">\n    <li>\n      <div class=\"timeline-badge default\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-users\">\n            <use xlink:href=\"#users\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Attended Listening Training</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">7/10/2014</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge info\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-users\">\n            <use xlink:href=\"#users\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Joined the India Interest Group</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">1/18/2014</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge info\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-users\">\n            <use xlink:href=\"#users\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Joined the Fathers Oakley Fall 2011 Group</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">11/8/2013</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge default\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-calendar\">\n            <use xlink:href=\"#calendar\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Attended Go Cincinnati</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">5/10/2013</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge info\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-users\">\n            <use xlink:href=\"#users\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Joined the Crossroads.net Development Group</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">11/8/2012</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge info\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-users\">\n            <use xlink:href=\"#users\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Joined the Crossroads.net Contractors Group</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">11/8/2012</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge success\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-gift\">\n            <use xlink:href=\"#gift\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">My first financial gift</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">11/23/2003</p></div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"timeline-badge primary\">\n        <svg viewBox=\"0 0 32 32\" class=\"icon icon-close\">\n          <use xlink:href=\"#close\"></use>\n        </svg>\n      </div>\n      <div class=\"timeline-panel\">\n        <div class=\"timeline-heading\">\n          <h5 class=\"timeline-title\">Attended my first Crossroads service</h5>\n          <div class=\"timeline-body\"><p class=\"text-muted\">7/14/2003</p></div>\n        </div>\n      </div>\n    </li>\n  </ul>\n</div>\n");
$templateCache.put("profile_household.html","<fieldset class=\"row\">\n  <legend class=\"col-sm-12\">Your Household</legend>\n  <div class=\"col-md-4 profile-card clearfix\">\n    <div class=\"well well-sm\">\n      <div class=\"media\">\n        <div class=\"thumbnail pull-left\">\n          <img class=\"media-object\" src=\"//crossroads-media.s3.amazonaws.com/images/avatar.svg\" alt=\"Profile Default Photo\" />\n        </div>\n        <div class=\"media-body\">\n          <h4 class=\"media-heading\">Jane Doe</h4>\n          <p><span class=\"label label-info\">Spouse</span></p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4 profile-card clearfix\">\n    <div class=\"well well-sm\">\n      <div class=\"media\">\n        <div class=\"thumbnail pull-left\">\n          <img class=\"media-object\" src=\"//crossroads-media.s3.amazonaws.com/images/avatar.svg\" alt=\"Profile Default Photo\" />\n        </div>\n        <div class=\"media-body\">\n          <h4 class=\"media-heading\">John Doe</h4>\n          <p><span class=\"label label-info\">Son</span></p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4 profile-card clearfix\">\n    <div class=\"well well-sm\">\n      <div class=\"media\">\n        <div class=\"thumbnail pull-left\">\n          <img class=\"media-object\" src=\"//crossroads-media.s3.amazonaws.com/images/avatar.svg\" alt=\"Profile Default Photo\" />\n        </div>\n        <div class=\"media-body\">\n          <h4 class=\"media-heading\">Jill Doe</h4>\n          <p><span class=\"label label-info\">Daughter</span></p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</fieldset>\n\n  <hr class=\"col-sm-12\" />\n\n<fieldset class=\"row\">\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"street\">Street</label>\n    <input type=\"text\" class=\"form-control\" id=\"street\" placeholder=\"Enter street address\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"street2\">Street 2</label>\n    <input type=\"text\" class=\"form-control\" id=\"street2\" placeholder=\"Enter street address (cont.)\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"city\">City</label>\n    <input type=\"text\" class=\"form-control\" id=\"city\" placeholder=\"Enter city\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"state\">State</label>\n    <select class=\"form-control col-sm-12\">\n      {% for i in (1..31) %}\n        <option>{{ i }}</option>\n      {% endfor %}\n    </select>\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"zip\">Zip</label>\n    <input type=\"text\" class=\"form-control\" id=\"zip\" placeholder=\"Enter zip code\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"county\">County</label>\n    <input type=\"text\" class=\"form-control\" id=\"county\" placeholder=\"Enter county\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"country\">Country</label>\n    <select class=\"form-control col-sm-12\">\n      {% for i in (1..31) %}\n        <option>{{ i }}</option>\n      {% endfor %}\n    </select>\n  </div>\n\n  <hr class=\"col-sm-12\" />\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"homephone\">Home Phone</label>\n    <input type=\"text\" class=\"form-control\" id=\"homephone\" placeholder=\"Enter home phone\">\n  </div>\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"provider\">Service Provider</label>\n    <select class=\"form-control col-sm-12\">\n      {% for i in (1..31) %}\n        <option>{{ i }}</option>\n      {% endfor %}\n    </select>\n  </div>\n\n  <hr class=\"col-sm-12\" />\n\n  <div class=\"form-group col-sm-6\">\n    <label for=\"provider\">Crossroads Location</label>\n    <select class=\"form-control col-sm-12\">\n      {% for i in (1..31) %}\n        <option>{{ i }}</option>\n      {% endfor %}\n    </select>\n  </div>\n\n</fieldset>\n\n<button class=\"btn btn-primary ladda-button\" data-style=\"expand-left\"><span class=\"ladda-label\">Save</span></button>\n");
$templateCache.put("profile_personal.html","<form role=\"form\" ng-controller=\"crdsProfilePersonal\">\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"firstname\">Email</label>\n      <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" placeholder=\"Enter email address\" ng-model=\"contact.emailaddress.value\">\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"firstname\">First Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"firstname\" placeholder=\"Enter first name\" ng-model=\"contact.firstname.value\">\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label for=\"middlename\">Middle Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"middlename\" placeholder=\"Enter middle name\" ng-model=\"contact.middlename.value\">\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label for=\"lastname\">Last Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"lastname\" placeholder=\"Enter last name\" ng-model=\"contact.lastname.value\">\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label for=\"maidenname\">Maiden Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"maidenname\" placeholder=\"Enter maiden name\">\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label for=\"nickname\">Nick Name <small class=\"text-muted\">(Example: Rob or Becky)</small></label>\n      <input type=\"text\" class=\"form-control\" id=\"nickname\" placeholder=\"Enter nick name\" ng-model=\"contact.nickname.value\">\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"nickname\">Mobile Phone</label>\n      <input type=\"text\" class=\"form-control\" id=\"mobile\" placeholder=\"Enter mobile phone\" ng-model=\"contact.mobile.value\">\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label for=\"provider\">Service Provider</label>\n      <select class=\"form-control col-sm-12\">\n        {% for i in (1..31) %}\n          <option>{{ i }}</option>\n        {% endfor %}\n      </select>\n    </div>\n\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6\" ng-controller=\"crdsDatePickerCtrl\">\n      <label class=\"control-label\">Birth Date</label>\n      <p class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" datepicker-popup=\"MM/dd/yyyy\" datepicker-append-to-body=\"true\" ng-model=\"contact.birthdate.value\" is-open=\"opened\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\" ng-click=\"open($event)\" />\n        <span class=\"input-group-btn\">\n          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"open($event)\"><svg viewBox=\"0 0 32 32\" class=\"icon icon-calendar\"><use xlink:href=\"#calendar\"></use></svg></button>\n        </span>\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"marital_status\">Maritial Status</label>\n      <select class=\"form-control col-sm-12\" ng-model=\"contact.maritalstatus.value\" ng-options=\"maritalstatus.id as maritalstatus.value for maritalstatus in maritalstatusVals\"></select>\n    </div>\n\n    <div class=\"form-group col-sm-6\">\n      <label class=\"block\">Gender</label>\n      <label class=\"radio-inline\" ng-repeat=\"gender in genders\">\n        <input type=\"radio\" id=\"gender\" ng-value=\"gender.value\" ng-model=\"contact.gender.value\"> {{ gender.value }}\n      </label>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <label for=\"employer\">Employer</label>\n      <input type=\"text\" class=\"form-control\" id=\"employer\" placeholder=\"Enter employer\">\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6\" ng-controller=\"crdsDatePickerCtrl\">\n      <label class=\"control-label\">When did you start attending Crossroads?</label></span>\n      <p class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" datepicker-popup=\"MM/dd/yyyy\" ng-model=\"contact.startattending.value\" is-open=\"opened\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\" ng-click=\"open($event)\" />\n        <span class=\"input-group-btn\">\n          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"open($event)\"><svg viewBox=\"0 0 32 32\" class=\"icon icon-calendar\"><use xlink:href=\"#calendar\"></use></svg></button>\n        </span>\n      </p>\n    </div>\n  </div>\n\n  <button class=\"btn btn-primary ladda-button\" data-style=\"expand-left\"><span class=\"ladda-label\">Save</span></button>\n</form>\n");
$templateCache.put("profile_skills.html","<div >skills\n</div>\n");}]);