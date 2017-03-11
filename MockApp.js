(function (exports) {

	'use strict';

	const MockApp = function (applicationEvents, component) {
		return new MockApp.init(applicationEvents, component);
	};

	MockApp.prototype = {
		getEvents: function () {
			return this.applicationEvents;
		}
	};

	MockApp.init = function (applicationEvents, component) {
		this.applicationEvents = applicationEvents || [];
		this.component = component || [];

		associateEventHandlers.call(this);
	};

	function associateEventHandlers() {
		const self = this;
		self.applicationEvents.forEach(function (applicationEvent) {
			const associatedHandlers = self.component.eventHandlers.filter(function (handler) {
				return handler.name === applicationEvent.name;
			});

			applicationEvent.setParams = function (params) {
				applicationEvent.params = params;
				return applicationEvent;
			};

			applicationEvent.fire = function () {
				associatedHandlers.forEach(function (handler) {
					self.component.controller[handler.action.slice(2)](self.component, {
						getParam: function (param) {
							return applicationEvent.params[param];
						}
					});
				});
			};
		});
	}

	MockApp.init.prototype = MockApp.prototype;

	exports.MockApp = MockApp;

})(this);

