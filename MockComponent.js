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

            return this.attributes.find(function (obj) {
                return obj.name === attributeName.slice(2);
            });
        },

        set: function (attributeName, newValue) {
            var attribute = this.get(attributeName);
            attribute.value = newValue;
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
        this.registeredEvents.forEach(function (registeredEvent) {
            const associatedHandlers = this.eventHandlers.filter(function (handler) {
                return handler.name === registeredEvent.name;
            });

            if (associatedHandlers.length > 0) {
                registeredEvent['fire'] = function () {
                    associatedHandlers.forEach(function (handler) {
                        handler.action();
                    });
                };
            }
        }, this);
    }

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

