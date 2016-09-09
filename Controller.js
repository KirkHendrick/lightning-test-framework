/**
 * Created by khendrick on 8/24/16.
 */
var Mock$A = require('./Mock$A').Mock$A;

var TestController = (function TestController($A) {

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
            helper.testGet(component);
        },

        test$AisUndefined : function(obj) {
            $A.util.isUndefined(obj);
        }
    };


})(Mock$A);

exports.Controller = TestController;
