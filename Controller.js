/**
 * Created by khendrick on 8/24/16.
 */
//var helper = require('./Helper');

var Controller = (function Controller() {

    'use strict';

    return {
        
        // drop controller here

        testGet : function(component) {
            var testAttribute = component.get('v.testAttribute');
        }
    };


})();

exports.Controller = Controller;
