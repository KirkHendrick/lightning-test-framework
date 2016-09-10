/**
 * Created by khendrick on 9/3/16.
 */

(function(exports) {

    'use strict';

    var MockComponent = function(attributes, elements,
                                 registeredEvents, eventHandlers) {
        return new MockComponent.init(attributes, elements,
            registeredEvents, eventHandlers);
    };


    MockComponent.prototype = {
        get : function(attributeName) {
            var attribute = this.attributes.filter(function(obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            return attribute;
        },

        set : function(attributeName, newValue) {
            var attribute = this.attributes.filter(function(obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            attribute.value = newValue;
        },

        find : function(elementName) {
            var element = this.elements.filter(function(obj) {
                return obj.name === elementName;
            })[0];

            return element;
        },

        getEvent : function(eventName) {
            var event = this.registeredEvents.filter(function(obj) {
                return obj.name === eventName;
            })[0];

            return event;
        }
    };

    MockComponent.init = function(attributes, elements,
                                  registeredEvents, eventHandlers) {
        this.attributes = attributes || [];
        this.elements = elements || [];
        this.registeredEvents = registeredEvents || [];
        this.eventHandlers = eventHandlers || [];

        associateEventHandlers.call(this);
    };

    function associateEventHandlers() {
        var i, j, handler, action, registeredEvent, associatedHandler;

        for(i = 0; i < this.registeredEvents.length; i++) {
            registeredEvent = this.registeredEvents[i];

            for(j = 0; j < this.eventHandlers.length; j++) {
                handler = this.eventHandlers[j];

                if(handler.name === registeredEvent.name) {
                    associatedHandler = handler;
                }
            }

            if(associatedHandler) {
                registeredEvent['fire'] = associatedHandler.action;
            }
        }
    }

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

