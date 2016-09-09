/**
 * Created by khendrick on 8/24/16.
 */
//var helper = require('./Helper');

var TestController = (function TestController() {

    'use strict';

    return {
        
        // drop controller here

        testGet : function(component) {
            var testAttribute = component.get('v.testAttribute');
        },

        testSet : function(component) {
            component.set('v.testAttribute', 'newValue');
        },

        testFind : function(component) {
            var testElement = component.find('testElement');
        }
    };


})();

exports.Controller = TestController;
