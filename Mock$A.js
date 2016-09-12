/**
 * Created by khendrick on 9/9/16.
 */
var MockComponent = require('./MockComponent').MockComponent;
    //MockApp = require('./MockApp').MockApp;

var Mock$A = (function Mock$A() {

    'use strict';

    return {
        util : {
            isUndefined : function(obj) {
                return obj === undefined;
            },

            isUndefinedOrNull : function(obj) {
                return (obj === undefined || obj === null);
            },

            addClass : function(element, cssClass) {
                element.cssClasses = element.cssClasses.concat(cssClass);
            },

            removeClass : function(element, cssClass) {
                element.cssClasses = element.cssClasses.replace(cssClass, '');
            },

            hasClass : function(element, cssClass) {
                return ~element.cssClasses.indexOf(cssClass);
            },

            toggleClass : function(element, cssClass) {
                if(this.hasClass(element, cssClass)) {
                    this.removeClass(element, cssClass);
                }
                else {
                    this.addClass(element, cssClass);
                }
            },

            getBooleanValue : function(value) {
                return Boolean(value);
            },

            isArray : function(obj) {
                return obj.constructor === Array;
            },

            isEmpty : function(value) {
                if(!value || value.constructor === Array && value.length === 0){
                    return true;
                }
                return false;
            },

            isObject : function(value) {
                if(value &&
                   value.constructor !== Array &&
                    typeof value === 'object') {
                    return true;
                }
                return false;
            }
        },

        enqueueAction : function(action) {
            const response = action();
            if(action.callback) {
                action.callback(response);
            }
        },

        createComponent: function(type, elements, callback) {
            var component = MockComponent([], [elements]);
            callback(component);
        },

        createComponents: function(components, callback) {
            var createdComponents = [];
            for(var i = 0; i < components.length; i++) {
                this.createComponent(components[i][0], components[i][1], function(cmp) {
                   createdComponents.push(cmp);
                });
            }
            callback(createdComponents);
        },

        get: function(eventName) {
            if(this.app) {
                var events = this.app.getEvents();

                var event = events.filter(function(obj) {
                    return obj.name === eventName.slice(4);
                })[0];

                return event;
            }
            return {
                name: eventName.slice(4),
                fire : function() {}
            }
        },

        setApp: function(app) {
            this.app = app;
        }
    };

})();

exports.Mock$A = Mock$A;
