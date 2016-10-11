(function (exports) {

    'use strict';

    var MockComponent = function (attributes, elements, registeredEvents, eventHandlers, apexController, controller, helper) {
        if (attributes === undefined) {
            return new MockComponent.init();
        }
        else {
            if (!Array.isArray(attributes)) {
                const options = attributes;
                attributes = options.attributes || [];
                elements = options.elements || [];
                registeredEvents = options.registeredEvents || [];
                eventHandlers = options.eventHandlers || [];
                apexController = options.apexController || {};
                controller = options.controller || {};
                helper = options.helper || {};
            }

            return new MockComponent.init(attributes, elements, registeredEvents, eventHandlers, apexController, controller, helper);
        }
    };

    MockComponent.prototype = {
        get: function (input) {
            const self = this;

            if (input[0] === 'c') {
                return getControllerAction(input);
            }
            else if (input[0] === 'v') {
                return getAttribute(input);
            }

            function getControllerAction(input) {
                var action = self.getReference(input);

                action.setParams = function (params) {
                    action.params = Object.keys(params)
                        .map(function (param) {
                            if (params.hasOwnProperty(param)) {
                                return params[param];
                            }
                        });
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
            return this.apexController[actionName.slice(2)];
        }
    };

    MockComponent.init = function (attributes, elements, registeredEvents, eventHandlers, apexController, controller, helper) {
        this.attributes = attributes || [];
        this.elements = elements || [];
        this.registeredEvents = registeredEvents || [];
        this.eventHandlers = eventHandlers || [];
        this.apexController = apexController || {};
        this.controller = controller || {};
        this.helper = helper || {};

        associateEventHandlers.call(this);
    };

    function associateEventHandlers() {
        const self = this;
        self.registeredEvents.forEach(function (registeredEvent) {
            const associatedHandlers = self.eventHandlers.filter(function (handler) {
                return handler.name === registeredEvent.name;
            });

            registeredEvent.setParams = function (params) {
                registeredEvent.params = params;
                return registeredEvent;
            };

            registeredEvent.fire = function () {
                associatedHandlers.forEach(function (handler) {
                    self.controller[handler.action.slice(2)](self, {
                            getParam: function (param) {
                                return registeredEvent.params[param];
                            }
                        },
                        self.helper);
                });
            };
        });
    }

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);
