/**
 * Created by khendrick on 9/3/16.
 */

(function (exports) {

    'use strict';

    var MockComponent = function (attributes, elements, registeredEvents, eventHandlers, controller) {
        return new MockComponent.init(attributes, elements, registeredEvents, eventHandlers, controller);
    };

    MockComponent.prototype = {
        get: function (attributeName) {
            if (attributeName[0] === 'c') {
                var method = this.getReference(attributeName);
                method['setCallback'] = function (context, callback) {
                    method['callback'] = callback;
                };
                return method;
            }

            var attribute = this.attributes.filter(function (obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            return attribute;
        },

        set: function (attributeName, newValue) {
            var attribute = this.attributes.filter(function (obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            attribute.value = newValue;
        },

        find: function (auraId) {
            var element = this.elements.filter(function (obj) {
                return obj.auraId === auraId;
            })[0];

            return element;
        },

        getEvent: function (eventName) {
            var event = this.registeredEvents.filter(function (obj) {
                return obj.name === eventName;
            })[0];

            return event;
        },

        getReference: function (methodName) {
            return this.controller[methodName.slice(2)];
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
        var i, j, k, handler, registeredEvent,
            associatedHandlers = [];

        for (i = 0; i < this.registeredEvents.length; i++) {
            registeredEvent = this.registeredEvents[i];

            for (j = 0; j < this.eventHandlers.length; j++) {
                handler = this.eventHandlers[j];

                if (handler.name === registeredEvent.name) {
                    associatedHandlers.push(handler);
                }
            }

            if (associatedHandlers.length > 0) {
                registeredEvent['fire'] = function () {
                    for (k = 0; k < associatedHandlers.length; k++) {
                        associatedHandlers[k].action();
                    }
                };
            }
        }
    }

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

