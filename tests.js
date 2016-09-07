/**
 * Created by khendrick on 9/7/16.
 */

var assert = require('assert'),
    component = require('./Component');
    /*
    controller = require('./Controller'),
    helper = require('./Helper');
    */

describe('initial tests', function () {
    describe('does exist', function () {
        it('should not be null', function () {
            var cmp = component;
            console.log(cmp);

            assert.notDeepEqual(cmp, undefined);
        });
    });

});

