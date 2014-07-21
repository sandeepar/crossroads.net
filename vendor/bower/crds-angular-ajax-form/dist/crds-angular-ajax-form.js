(function() {
  angular.module("crds-ajax-form", []);

}).call(this);

(function() {
  angular.module("crds-ajax-form").directive("crdsAjaxFormSuccess", function($animate) {
    return {
      require: '^crdsAjaxForm',
      restrict: 'EA',
      scope: true,
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

  angular.module("crds-ajax-form").directive("crdsAjaxForm", function($timeout, $http, $animate) {
    return {
      restrict: 'A',
      scope: true,
      priority: 100,
      require: ['crdsAjaxForm', 'form'],
      link: function($scope, $element, $attrs, controllers) {
        var CrdsAjaxFormCtrl, FormCtrl;
        CrdsAjaxFormCtrl = controllers[0];
        FormCtrl = controllers[1];
        return new ((function() {
          _Class.controls = null;

          _Class.changeWatches = null;

          function _Class() {
            this.forceDirty = __bind(this.forceDirty, this);
            this.showError = __bind(this.showError, this);
            this.submitHandler = __bind(this.submitHandler, this);
            this.removeWatch = __bind(this.removeWatch, this);
            this.addWatch = __bind(this.addWatch, this);
            this.addAllWatches = __bind(this.addAllWatches, this);
            this.findControls = __bind(this.findControls, this);
            this.watchForm = __bind(this.watchForm, this);
            var input;
            this.changeWatches = {};
            this.FORM_SUCCESS_MESSAGE = "form.success";
            this.VALIDATION_ERROR_MESSAGE = "form.validation.error";
            this.SERVER_ERROR_MESSAGE = "form.server.error";
            this.controls = {};
            this.errorFields = [];
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
            $element.bind('submit', this.submitHandler);
            $timeout((function(_this) {
              return function() {
                _this.findControls();
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
                  if (!(!name.match(/^\$/))) {
                    continue;
                  }
                  if (!newValue[name]) {
                    _this.removeWatch(name);
                  }
                  if (_this.controls[name]) {
                    delete _this.controls[name];
                  }
                }
                if (hasNew) {
                  return _this.findControls();
                }
              };
            })(this), true);
          };

          _Class.prototype.findControls = function() {
            var element, _i, _len, _ref, _results;
            _ref = $element[0].elements;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              if (element.type !== 'hidden' && !this.controls[element.name]) {
                _results.push(this.controls[element.name] = element);
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
            if (!this.changeWatches[name]) {
              return this.changeWatches[name] = $scope.$watch("" + $attrs.name + "['" + name + "'].$viewValue", (function(_this) {
                return function(newValue, oldValue) {
                  return _this.viewValueChange(name, newValue, oldValue);
                };
              })(this));
            }
          };

          _Class.prototype.removeWatch = function(name) {
            if (this.changeWatches[name]) {
              this.changeWatches[name]();
            }
            return delete this.changeWatches[name];
          };

          _Class.prototype.viewValueChange = function(field, newValue, oldValue) {
            var form;
            if (newValue !== oldValue) {
              form = $scope[$attrs.name];
              if (form && form[field]) {
                form[field].$setValidity('server', true, form);
                return form[field].$setPristine();
              }
            }
          };

          _Class.prototype.submitHandler = function(event) {
            var errorMessage, field, fields, form, httpConfig, input, _i, _j, _len, _len1, _ref, _ref1;
            event.stopPropagation();
            event.preventDefault();
            form = $scope[$attrs.name];
            this.clearDirty(form);
            _ref = this.errorFields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              this.clearError(form, field);
            }
            this.errorFields = [];
            if (form.$valid) {
              fields = $scope.$eval($attrs.crdsAjaxForm) || {};
              _ref1 = this.hidden;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                input = _ref1[_j];
                fields[input.name] = input.value;
              }
              httpConfig = {
                method: $attrs.method,
                url: $attrs.action,
                data: fields
              };
              if (!$attrs.enctype || $attrs.enctype === 'application/x-www-form-urlencoded') {
                httpConfig.transformRequest = this.formUrlEncodedRequest;
              } else if ($attrs.enctype !== 'application/json') {
                errorMessage = "Ajax Form does not support " + $attrs.enctype + " encoded forms";
                console.log(errorMessage);
                return false;
              }
              $http(httpConfig).success((function(_this) {
                return function(data, status, headers, config) {
                  if (controllers[0].getSuccessHandler()) {
                    controllers[0].getSuccessHandler()();
                    $element.remove();
                  } else {
                    $scope.$emit('notify.success', _this.FORM_SUCCESS_MESSAGE);
                  }
                  form.$setPristine();
                };
              })(this)).error((function(_this) {
                return function(data, status, headers, config) {
                  var error, _k, _len2;
                  if (status === 400) {
                    $scope.$emit('notify.error', _this.VALIDATION_ERROR_MESSAGE);
                    if (data) {
                      for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
                        error = data[_k];
                        _this.showError(form, error);
                      }
                    }
                  } else {
                    $scope.$emit('notify.error', _this.SERVER_ERROR_MESSAGE);
                  }
                };
              })(this));
            } else {
              $scope.$emit('notify.error', this.VALIDATION_ERROR_MESSAGE);
              $timeout((function(_this) {
                return function() {
                  return _this.forceDirty(form);
                };
              })(this), 0);
            }
            return false;
          };

          _Class.prototype.showError = function(form, error) {
            form.$setDirty();
            if (form[error.param]) {
              form[error.param].$setValidity('server', false, form);
              form[error.param].$dirty = true;
              form[error.param].$pristine = false;
              if (this.controls[error.param]) {
                angular.element(this.controls[error.param]).removeClass('ng-pristine');
                angular.element(this.controls[error.param]).addClass('ng-dirty');
              }
              return this.errorFields.push(error.param);
            }
          };

          _Class.prototype.clearError = function(form, field) {
            form[field].$setValidity('server', true, form);
            form[field].$setPristine();
          };

          _Class.prototype.forceDirty = function(form) {
            var error, input, inputs, modelValue, _ref, _results;
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
                    if (input && input.$invalid) {
                      modelValue = form[input.$name].$modelValue;
                      input.$dirty = true;
                      input.$pristine = false;
                      if (this.controls[input.$name]) {
                        angular.element(this.controls[input.$name]).removeClass('ng-pristine');
                        _results1.push(angular.element(this.controls[input.$name]).addClass('ng-dirty'));
                      } else {
                        _results1.push(void 0);
                      }
                    } else {
                      _results1.push(void 0);
                    }
                  }
                  return _results1;
                }).call(this));
              }
              return _results;
            }
          };

          _Class.prototype.clearDirty = function(form) {
            var input, name, _results;
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

          _Class.prototype.formUrlEncodedRequest = function(data, getHeaders) {
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

          return _Class;

        })());
      },
      controller: function($scope, $element, $attrs) {
        var CrdsAjaxFormController;
        return new (CrdsAjaxFormController = (function() {
          CrdsAjaxFormController.successHandler = null;

          function CrdsAjaxFormController() {
            this.getSuccessHandler = __bind(this.getSuccessHandler, this);
            this.registerSuccess = __bind(this.registerSuccess, this);
            if (!$attrs.name) {
              $attrs.name = 'form';
            }
            return;
          }

          CrdsAjaxFormController.prototype.registerSuccess = function(successHandler) {
            return this.successHandler = successHandler;
          };

          CrdsAjaxFormController.prototype.getSuccessHandler = function() {
            return this.successHandler;
          };

          return CrdsAjaxFormController;

        })());
      }
    };
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  angular.module("crds-ajax-form").directive("crdsBootstrapValidation", function($timeout, $http, $animate) {
    return {
      restrict: 'A',
      scope: true,
      require: 'form',
      link: function($scope, $element, $attrs, FormCtrl) {
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
            var input, name, _results;
            _results = [];
            for (name in FormCtrl) {
              if (!__hasProp.call(FormCtrl, name)) continue;
              input = FormCtrl[name];
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
      controller: function($scope, $element, $attrs) {
        if (!$attrs.name) {
          $attrs.name = 'form';
        }
      }
    };
  });

}).call(this);
