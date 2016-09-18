/**
 * Created by khendrick on 9/9/16.
 */
var MockComponent = require('./MockComponent').MockComponent;

(function (exports) {

	'use strict';

	var Mock$A = function (app) {
		return new Mock$A.init(app);
	};

	Mock$A.prototype = {

		util: {
			isUndefined: function (obj) {
				return obj === undefined;
			},

			isUndefinedOrNull: function (obj) {
				return (obj === undefined || obj === null);
			},

			addClass: function (element, cssClass) {
				element.cssClasses = element.cssClasses.concat(cssClass);
			},

			removeClass: function (element, cssClasses) {
				cssClasses.split(' ').forEach(function (cssClass) {
					element.cssClasses = element.cssClasses.replace(cssClass, '');
				});
			},

			hasClass: function (element, cssClass) {
				return ~element.cssClasses.indexOf(cssClass);
			},

			toggleClass: function (element, cssClass) {
				if (this.hasClass(element, cssClass)) {
					this.removeClass(element, cssClass);
				}
				else {
					this.addClass(element, cssClass);
				}
			},

			getBooleanValue: function (value) {
				return Boolean(value);
			},

			isArray: function (obj) {
				return obj.constructor === Array;
			},

			isEmpty: function (value) {
				return (!value || Array.isArray(value) && value.length === 0);
			},

			isObject: function (value) {
				if (value && !Array.isArray(value) &&
					typeof value === 'object') {
					return true;
				}
				return false;
			}
		},

		enqueueAction: function (action) {
			const result = action.apply(this, action.params);
			if (action.callback) {
				action.callback(generateResponse(result));
			}

			function generateResponse(result) {
				const Response = function(state, result, error) {
					this.getState = function() {
						return state;
					};

					this.getReturnValue = function() {
						return result;
					};

					this.getError = function() {
						return [{
							message: error
						}];
					};
				};

				if (result) {
					return new Response('SUCCESS', result);
				}
				else {
					return new Response('ERROR', result, 'There was no response.');
				}
			}
		},

		createComponent: function (type, elements, callback) {
			callback(MockComponent([], [elements]));
		},

		createComponents: function (components, callback) {
			const createdComponents = components.map(function (component) {
				var c;
				this.createComponent(component[0], component[1], function (cmp) {
					c = cmp;
				});
				return c;
			}, this);
			callback(createdComponents);
		},

		get: function (eventName) {
			if (this.app) {
				const events = this.app.getEvents();

				return events.find(function (obj) {
					return obj.name === eventName.slice(4);
				});
			}
		}
	};

	Mock$A.init = function (app) {
		this.app = app;
	};

	Mock$A.init.prototype = Mock$A.prototype;

	exports.Mock$A = Mock$A;

})(this);

