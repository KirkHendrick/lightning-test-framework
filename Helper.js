/**
 * Created by khendrick on 8/26/16.
 */
var Mock$A = require('./Mock$A').Mock$A;

var TestHelper = (function TestHelper($A) {

    'use strict';

    return {

        testGet : function(component) {
            return component.get('v.testAttribute');
        },

        test$AisUndefined : function(obj) {
            $A.util.isUndefined(obj);
        }
    };

})(Mock$A());

exports.Helper = TestHelper;
