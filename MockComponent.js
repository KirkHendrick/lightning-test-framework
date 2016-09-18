/**
 * Created by khendrick on 9/3/16.
 */

(function (exports) {

	'use strict';

	var MockComponent = function (attributes, elements, registeredEvents, eventHandlers, controller) {
		return new MockComponent.init(attributes, elements, registeredEvents, eventHandlers, controller);
	};

	MockComponent.prototype = {
		get: function (input) {
			const self = this;

			if (input[0] === 'c') {
				return getControllerAction(input);
			}
			else if(input[0] === 'v') {
				return getAttribute(input);
			}

			function getControllerAction(input) {
				var action = self.getReference(input);

				action.setParams = function (params) {
					var paramArray = [];
					for (var param in params) {
						if (params.hasOwnProperty(param)) {
							paramArray.push(params[param]);
						}
					}
					action.params = paramArray;
				};

				action.setCallback = function (context, callback) {
					action.callback = callback;
				};

				return action;
			}

			function getAttribute(input) {
				return self.attributes.find(function (obj) {
					return obj.name === input.slice(2);
				}).value;
			}
		},

		set: function (attributeName, newValue) {
			this.attributes.find(function (obj) {
				return obj.name === attributeName.slice(2);
			}).value = newValue;
		},

		find: function (auraId) {
			return this.elements.find(function (obj) {
				return obj.auraId === auraId;
			});
		},

		getEvent: function (eventName) {
			return this.registeredEvents.find(function (obj) {
				return obj.name === eventName;
			});
		},

		getReference: function (actionName) {
			return this.controller[actionName.slice(2)];
		}
	};

	MockComponent.init = function (attributes, elements, registeredEvents, eventHandlers, controller) {
		this.attributes = attributes || [];
		this.elements = elements || [];
		this.registeredEvents = registeredEvents || [];
		this.eventHandlers = eventHandlers || [];
		this.controller = controller || {};

		associateEventHandlers.call(this);
	};

	function associateEventHandlers() {
		this.registeredEvents.forEach(function (registeredEvent) {
			const associatedHandlers = this.eventHandlers.filter(function (handler) {
				return handler.name === registeredEvent.name;
			});

			registeredEvent.fire = function () {
				associatedHandlers.forEach(function (handler) {
					handler.action();
				});
			};
		}, this);
	}

	MockComponent.init.prototype = MockComponent.prototype;

	exports.MockComponent = MockComponent;

})(this);
