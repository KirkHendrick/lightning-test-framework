/**
 * Created by khendrick on 8/26/16.
 */
var TestHelper = (function TestHelper() {

    'use strict';

    return {

        testGet : function(component) {
            return component.get('v.testAttribute');
        }

    };

})();

exports.Helper = TestHelper;
