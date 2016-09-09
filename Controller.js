/**
 * Created by khendrick on 8/24/16.
 */
var TestController = (function TestController() {

    'use strict';

    return {
        
        testGet : function(component) {
            var testAttribute = component.get('v.testAttribute');
        },

        testSet : function(component) {
            component.set('v.testAttribute', 'newValue');
        },

        testFind : function(component) {
            var testElement = component.find('testElement');
        },

        testHelperGet : function(component, event, helper) {
            var testAttribute = helper.testGet(component);
        }
    };


})();

exports.Controller = TestController;
