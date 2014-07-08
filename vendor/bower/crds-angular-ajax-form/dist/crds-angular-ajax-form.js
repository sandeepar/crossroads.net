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

  angular.module("crds-ajax-form").directive("crdsAjaxForm", function($timeout) {
    return {
      restrict: 'A',
      scope: true,
      require: ['crdsAjaxForm', 'form'],
      link: function($scope, $element, $attrs, controllers) {
        return new ((function() {
          _Class.elements = null;

          _Class.watches = null;

          _Class.dirtyWatches = null;

          function _Class() {
            this.checkInputValid = __bind(this.checkInputValid, this);
            this.removeWatch = __bind(this.removeWatch, this);
            this.addWatch = __bind(this.addWatch, this);
            this.addAllWatches = __bind(this.addAllWatches, this);
            this.findParentElements = __bind(this.findParentElements, this);
            this.watchForm = __bind(this.watchForm, this);
            this.elements = {};
            this.watches = {};
            this.dirtyWatches = {};
            $timeout((function(_this) {
              return function() {
                _this.findParentElements();
                _this.addAllWatches();
                return _this.watchForm();
              };
            })(this), 0);
          }

          _Class.prototype.watchForm = function() {
            return $scope.$watch("" + $attrs.name, (function(_this) {
              return function(newValue, oldValue) {
                var hasNew, input, name;
                for (name in newValue) {
                  if (!__hasProp.call(newValue, name)) continue;
                  input = newValue[name];
                  if (!(!name.match(/^\$/))) {
                    continue;
                  }
                  if (!oldValue[name]) {
                    _this.addWatch(name, input);
                  }
                  hasNew = true;
                }
                for (name in oldValue) {
                  if (!__hasProp.call(oldValue, name)) continue;
                  input = oldValue[name];
                  if (!name.match(/^\$/)) {
                    if (!newValue[name]) {
                      _this.removeWatch(name);
                    }
                  }
                }
                if (hasNew) {
                  return _this.findParentElements();
                }
              };
            })(this), true);
          };

          _Class.prototype.findParentElements = function() {
            var candidate, element, _i, _len, _ref, _results;
            _ref = $element[0].elements;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              if (!(element.type !== 'hidden' && !this.elements[element.name])) {
                continue;
              }
              candidate = angular.element(element);
              while (true) {
                candidate = candidate.parent();
                if (candidate.hasClass('form-group') || !candidate || candidate.length === 0) {
                  break;
                }
              }
              if (candidate) {
                _results.push(this.elements[element.name] = candidate);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };

          _Class.prototype.addAllWatches = function() {
            var formCtrl, input, name, _results;
            formCtrl = controllers[1];
            _results = [];
            for (name in formCtrl) {
              if (!__hasProp.call(formCtrl, name)) continue;
              input = formCtrl[name];
              if (!name.match(/^\$/)) {
                _results.push(this.addWatch(name, input));
              }
            }
            return _results;
          };

          _Class.prototype.addWatch = function(name, input) {
            if (!this.watches[name]) {
              this.watches[name] = $scope.$watch("" + $attrs.name + "['" + name + "'].$invalid", (function(_this) {
                return function() {
                  return _this.checkInputValid(name);
                };
              })(this));
              this.dirtyWatches[name] = $scope.$watch("" + $attrs.name + "['" + name + "'].$dirty", (function(_this) {
                return function() {
                  return _this.checkInputValid(name);
                };
              })(this));
              return this.checkInputValid(name);
            }
          };

          _Class.prototype.removeWatch = function(name) {
            if (this.watches[name]) {
              this.watches[name]();
            }
            if (this.dirtyWatches[name]) {
              this.dirtyWatches[name]();
            }
            delete this.watches[name];
            return delete this.dirtyWatches[name];
          };

          _Class.prototype.checkInputValid = function(name) {
            var element;
            element = $scope[$attrs.name][name];
            if (element && element.$invalid && element.$dirty) {
              if (this.elements[name]) {
                this.elements[name].addClass("has-error");
              }
              if (this.elements[name]) {
                return this.elements[name].addClass("has-feedback");
              }
            } else {
              if (this.elements[name]) {
                this.elements[name].removeClass("has-error");
              }
              if (this.elements[name]) {
                return this.elements[name].removeClass("has-feedback");
              }
            }
          };

          return _Class;

        })());
      },
      controller: function($scope, $element, $attrs, $http) {
        var CrdsAjaxFormController;
        return new (CrdsAjaxFormController = (function() {
          CrdsAjaxFormController.successHandler = null;

          function CrdsAjaxFormController() {
            this.registerSuccess = __bind(this.registerSuccess, this);
            var clearDirty, clearError, errorFields, forceDirty, input, showError;
            this.FORM_SUCCESS_MESSAGE = "form.success";
            this.VALIDATION_ERROR_MESSAGE = "form.validation.error";
            this.SERVER_ERROR_MESSAGE = "form.server.error";
            errorFields = [];
            this.form = $scope[$attrs.name];
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
                var errorMessage, field, fields, form, httpConfig, _i, _j, _len, _len1, _ref;
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
                  httpConfig = {
                    method: $attrs.method,
                    url: $attrs.action,
                    data: fields
                  };
                  if (!$attrs.enctype || $attrs.enctype === 'application/x-www-form-urlencoded') {
                    httpConfig.transformRequest = _this.formUrlEncodedRequest;
                  } else if ($attrs.enctype !== 'application/json') {
                    errorMessage = "Ajax Form does not support " + $attrs.enctype + " encoded forms";
                    console.log(errorMessage);
                    return false;
                  }
                  $http(httpConfig).success(function(data, status, headers, config) {
                    if (_this.successMessage) {
                      _this.successMessage();
                      $element.remove();
                    } else {
                      $scope.$emit('notify.success', _this.FORM_SUCCESS_MESSAGE);
                    }
                    form.$setPristine();
                  }).error(function(data, status, headers, config) {
                    var error, _k, _len2;
                    if (status === 400) {
                      $scope.$emit('notify.error', _this.VALIDATION_ERROR_MESSAGE);
                      if (data) {
                        for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
                          error = data[_k];
                          showError(form, error);
                        }
                      }
                    } else {
                      $scope.$emit('notify.error', _this.SERVER_ERROR_MESSAGE);
                    }
                  });
                } else {
                  $scope.$emit('notify.error', _this.VALIDATION_ERROR_MESSAGE);
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

          CrdsAjaxFormController.prototype.formUrlEncodedRequest = function(data, getHeaders) {
            var headers, key, params, value;
            headers = getHeaders();
            headers['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8";
            if (angular.isObject(data)) {
              params = (function() {
                var _results;
                _results = [];
                for (key in data) {
                  if (!__hasProp.call(data, key)) continue;
                  value = data[key];
                  _results.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                }
                return _results;
              })();
              return params.join('&').replace(/%20/g, '+');
            } else {
              if (data !== null) {
                return data.toString();
              } else {
                return '';
              }
            }
          };

          return CrdsAjaxFormController;

        })());
      }
    };
  });

}).call(this);
