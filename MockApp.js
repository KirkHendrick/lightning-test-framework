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
        this.applicationEvents.forEach(function (applicationEvent) {
            const associatedHandlers = this.eventHandlers.filter(function (handler) {
                return handler.name === applicationEvent.name;
            });

            if (associatedHandlers.length > 0) {
                applicationEvent['fire'] = function () {
                    associatedHandlers.forEach(function (handler) {
                        handler.action();
                    });
                };
            }
        }, this);
    }

    MockApp.init.prototype = MockApp.prototype;

    exports.MockApp = MockApp;

})(this);

