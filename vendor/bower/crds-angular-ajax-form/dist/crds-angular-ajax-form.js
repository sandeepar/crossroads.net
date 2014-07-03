(function() {
  angular.module("crds-ajax-form", []);

}).call(this);

(function() {
  angular.module("crds-ajax-form").directive("crdsAjaxFormSuccess", function($animate) {
    return {
      require: '^crdsAjaxForm',
      restrict: 'EA',
      scope: true,
      terminal: true,
      priority: 1000,
      transclude: 'element',
      link: function($scope, $element, $attrs, formCtrl, $transclude) {
        formCtrl.registerSuccess(function() {
          var parent, target;
          parent = $element.parent();
          target = parent.parent();
          return $transclude(function(clone, newScope) {
            return $animate.enter(clone, target, parent);
          });
        });
      }
    };
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  angular.module("crds-ajax-form").directive("crdsAjaxForm", function($compile) {
    return {
      restrict: 'A',
      scope: true,
      controller: function($scope, $element, $attrs, $http) {
        var CrdsAjaxFormController;
        return new (CrdsAjaxFormController = (function() {
          CrdsAjaxFormController.successHandler;

          function CrdsAjaxFormController() {
            this.registerSuccess = __bind(this.registerSuccess, this);
            var clearDirty, clearError, errorFields, forceDirty, input, showError;
            errorFields = [];
            this.hidden = (function() {
              var _i, _len, _ref, _results;
              _ref = $element[0].elements;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                input = _ref[_i];
                if (input.type === 'hidden') {
                  _results.push(input);
                }
              }
              return _results;
            })();
            showError = function(form, error) {
              form.$setDirty();
              if (form[error.param]) {
                form[error.param].$setValidity('server', false, form);
                form[error.param].$setViewValue(form[error.param].$modelValue);
                return errorFields.push(error.param);
              }
            };
            clearError = function(form, field) {
              form[field].$setValidity('server', true, form);
              form[field].$setPristine();
            };
            forceDirty = function(form) {
              var error, inputs, _ref, _results;
              if (form.$error) {
                _ref = form.$error;
                _results = [];
                for (error in _ref) {
                  if (!__hasProp.call(_ref, error)) continue;
                  inputs = _ref[error];
                  _results.push((function() {
                    var _i, _len, _results1;
                    _results1 = [];
                    for (_i = 0, _len = inputs.length; _i < _len; _i++) {
                      input = inputs[_i];
                      if (!input.$valid) {
                        _results1.push(form[input.$name].$setViewValue(form[input.$name].$modelValue));
                      } else {
                        _results1.push(void 0);
                      }
                    }
                    return _results1;
                  })());
                }
                return _results;
              }
            };
            clearDirty = function(form) {
              var name, _results;
              _results = [];
              for (name in form) {
                if (!__hasProp.call(form, name)) continue;
                input = form[name];
                if (!name.match(/^\$/ && form[name].$valid && form[name].$setPristine)) {
                  _results.push(form[name].$setPristine());
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            };
            $element.bind('submit', (function(_this) {
              return function(event) {
                var field, fields, form, _i, _j, _len, _len1, _ref;
                event.stopPropagation();
                event.preventDefault();
                form = $scope[$attrs.name];
                clearDirty(form);
                for (_i = 0, _len = errorFields.length; _i < _len; _i++) {
                  field = errorFields[_i];
                  clearError(form, field);
                }
                errorFields = [];
                if (form.$valid) {
                  fields = $scope.$eval($attrs.crdsAjaxForm) || {};
                  _ref = _this.hidden;
                  for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    input = _ref[_j];
                    fields[input.name] = input.value;
                  }
                  $http({
                    method: $attrs.method,
                    url: $attrs.action,
                    data: fields
                  }).success(function(data, status, headers, config) {
                    if (_this.successMessage) {
                      _this.successMessage();
                      $element.remove();
                    } else {
                      $scope.$emit('notify.success', "Success!");
                    }
                    form.$setPristine();
                  }).error(function(data, status, headers, config) {
                    var error, _k, _len2;
                    if (status === 400) {
                      $scope.$emit('notify.warning', "Server-side validation failed");
                      if (data) {
                        for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
                          error = data[_k];
                          showError(form, error);
                        }
                      }
                    } else {
                      $scope.$emit('notify.error', "An unknown error occurred during form submission");
                    }
                  });
                } else {
                  $scope.$emit('notify.warning', "Client-side validation failed");
                  forceDirty(form);
                }
                return false;
              };
            })(this));
            return;
          }

          CrdsAjaxFormController.prototype.registerSuccess = function(successMessage) {
            return this.successMessage = successMessage;
          };

          return CrdsAjaxFormController;

        })());
      }
    };
  });

}).call(this);
