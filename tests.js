/**
 * Created by khendrick on 9/7/16.
 */

var assert = require('assert'),
    MockComponent = require('./MockComponent').MockComponent,
    TestController = require('./Controller').Controller,
    TestHelper = require('./Helper').Helper;

describe('MockComponent', function () {
    describe('#MockComponent()', function() {
        it('creates a new MockComponent object without the new keyword', function() {
            var component = MockComponent();

            assert.deepEqual(typeof component, 'object')
        });
    });

    describe('#get()', function () {
        it('should retrieve the correct attribute', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);

            var testAttribute = component.get("v.testAttribute");

            assert.deepEqual(testAttribute.name, 'testAttribute');
        });

        it('should retrieve the correct attribute value', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);

            var testAttribute = component.get("v.testAttribute");

            assert.deepEqual(testAttribute.value, 'testValue');
        });
    });

    describe('#set()', function () {
        it('should change the value of the correct attribute', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var newValue = 'newValue';

            component.set("v.testAttribute", newValue);

            var testAttribute = component.get("v.testAttribute");
            assert.deepEqual(testAttribute.value, newValue);
        });
    });

    describe('#find()', function() {
        it('should find the correct element by name', function() {
            var component = MockComponent([], [
                {
                    name: 'testElement'
                }
            ]);

            var testElement = component.find('testElement');

            assert.deepEqual(testElement.name, 'testElement');
        });
    });
});

describe('Controller', function() {
    describe('can use mock component', function() {
        it('should be able to use component #get() without error', function() {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var controller = TestController;

            controller.testGet(component);

            assert.ok(true, 'did not throw error');
        });

        it('should be able to use component #set() without error', function() {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var controller = TestController;

            controller.testSet(component);

            assert.ok(true, 'did not throw error');
        });

        it('should be able to use component #find() without error', function() {
            var component = MockComponent([], [
                {
                    name: 'testElement',
                }
            ]);
            var controller = TestController;

            controller.testFind(component);

            assert.ok(true, 'did not throw error');
        });
    });

    describe('can use helper', function() {
        it('should be able to use helper testGet without error', function() {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var controller = TestController;
            var helper = TestHelper;

            controller.testHelperGet(component, null, helper);

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('Helper', function() {
    describe('can use mock component', function() {
        it('should be able to use component #get() without error', function() {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);
            var helper = TestHelper;

            helper.testGet(component);

            assert.ok(true, 'did not throw error');
        });

    });
});
