/**
 * Created by khendrick on 9/7/16.
 */

var assert = require('assert'),
    MockComponent = require('./MockComponent').MockComponent;
    /*
    controller = require('./Controller'),
    helper = require('./Helper');
    */

describe('initial tests: ', function () {
    describe('does exist', function () {
        it('should not be null', function () {
            var component = MockComponent;

            assert.notDeepEqual(component, undefined);
        });
    });

    describe('can be invoked', function () {
        it('should not be null', function () {
            var component = MockComponent([]);

            assert.notDeepEqual(component, undefined);
        });
    });
});

