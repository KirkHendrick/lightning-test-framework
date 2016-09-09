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

    describe('can access attributes', function () {
        it('use .get to access them', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);

            var testAttribute = component.get("v.testAttribute");

            assert.deepEqual(testAttribute.name, 'testAttribute');
            assert.deepEqual(testAttribute.value, 'testValue');
        });
    });

    describe('can access attributes', function () {
        it('use .set to set them', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var newValue = 'newValue';

            component.set("v.testAttribute", newValue);

            var testAttribute = component.get("v.testAttribute");
            assert.deepEqual(testAttribute.name, 'testAttribute');
            assert.deepEqual(testAttribute.value, newValue);
        });
    });
});

