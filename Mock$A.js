/**
 * Created by khendrick on 9/9/16.
 */
var MockComponent = require('./MockComponent').MockComponent;

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
            action();
        },

        createComponent: function(type, elements, callback) {
            var component = MockComponent([], [elements]);
            callback(component);
        }
    };

})();

exports.Mock$A = Mock$A;
