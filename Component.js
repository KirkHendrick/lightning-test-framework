/**
 * Created by khendrick on 9/3/16.
 */
var controller = require('./Controller.js');
var helper = require('./Helper.js');

var Component = (function Component(controller, helper, state) {

    'use strict';

    var $A = {
        util : {
            // TODO: with these classes, rather than an
            // array of css class names, have a string and
            // remove class removes that substring
            hasClass : function(element, cssClassName) {
                for(var i = 0; i < element.cssClasses.length; i++) {
                    if(element.cssClasses[i].includes(cssClassName)) {
                        return true;
                    }
                }
                return false;
            },

            addClass : function(element, cssClassName) {
                element.cssClasses.push(cssClassName);
            },

            removeClass : function(element, cssClassName) {
                //element.cssClasses.pop(cssClassName);
            }
        }
    };

    var elements = [];

    var event;

    return {

        find : function(elementName) {
            for(var i = 0; i < elements.length; i++) {
                if(elements[i].name === elementName) {
                    return elements[i];
                }
            }
        },

        createElement : function(elementName) {
            elements.push({
                name : elementName,
                cssClasses : []
            });
        },

        getController : function() {
            return controller;
        },

        setController : function(controllerIn) {
           controller = controllerIn;
        },

        getHelper : function() {
            return helper;
        },

        setHelper : function (helperIn) {
            helper = helperIn;
        },

        getEvent : function() {
            return event;
        },

        setEvent : function(eventIn) {
            event = eventIn;
        },

        get$A : function () {
           return $A;
        }
    };

})(controller, helper);

exports.Component = Component;