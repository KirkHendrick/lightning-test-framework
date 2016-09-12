/**
 * Created by khendrick on 9/12/16.
 */
(function (exports) {

    'use strict';

    var MockApp = function (applicationEvents, eventHandlers) {
        return new MockApp.init(applicationEvents, eventHandlers);
    };

    MockApp.prototype = {
        getEvents: function () {
            return this.applicationEvents;
        }
    };

    MockApp.init = function (applicationEvents, eventHandlers) {
        this.applicationEvents = applicationEvents || [];
        this.eventHandlers = eventHandlers || [];

        associateEventHandlers.call(this);
    };

    function associateEventHandlers() {
        var i, j, k, handler, applicationEvent,
            associatedHandlers = [];

        for (i = 0; i < this.applicationEvents.length; i++) {
            applicationEvent = this.applicationEvents[i];

            for (j = 0; j < this.eventHandlers.length; j++) {
                handler = this.eventHandlers[j];

                if (handler.name === applicationEvent.name) {
                    associatedHandlers.push(handler);
                }
            }

            if (associatedHandlers.length > 0) {
                applicationEvent['fire'] = function () {
                    for (k = 0; k < associatedHandlers.length; k++) {
                        associatedHandlers[k].action();
                    }
                };
            }
        }
    }

    MockApp.init.prototype = MockApp.prototype;

    exports.MockApp = MockApp;

})(this);

