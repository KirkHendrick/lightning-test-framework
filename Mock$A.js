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
                if (!value || value.constructor === Array && value.length === 0) {
                    return true;
                }
                return false;
            },

            isObject: function (value) {
                if (value &&
                    value.constructor !== Array &&
                    typeof value === 'object') {
                    return true;
                }
                return false;
            }
        },

        enqueueAction: function (action) {
            const response = action();
            if (action.callback) {
                action.callback(response);
            }
        },

        createComponent: function (type, elements, callback) {
            var component = MockComponent([], [elements]);
            callback(component);
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
            return {
                name: eventName.slice(4),
                fire: function () {
                }
            }
        }
    };

    Mock$A.init = function (app) {
        this.app = app;
    };

    Mock$A.init.prototype = Mock$A.prototype;

    exports.Mock$A = Mock$A;

})(this);

