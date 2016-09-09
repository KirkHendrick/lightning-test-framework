/**
 * Created by khendrick on 9/9/16.
 */
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
            }
        }
    };


})();

exports.Mock$A = Mock$A;
