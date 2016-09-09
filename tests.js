/**
 * Created by khendrick on 9/7/16.
 */

var assert = require('assert'),
    MockComponent = require('./MockComponent').MockComponent,
    TestController = require('./Controller').Controller,
    TestHelper = require('./Helper').Helper,
    Mock$A = require('./Mock$A').Mock$A;

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

    describe('can use $A', function() {
        it('should be able to use $A.util.isUndefined without error', function() {
            var controller = TestController;

            controller.test$AisUndefined({});

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

    describe('can use $A', function() {
        it('should be able to use $A.util.isUndefined without error', function() {
            var helper = TestHelper;

            helper.test$AisUndefined({});

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('$A', function() {
    describe('#isUndefined()', function() {
        it('should return true if object is undefined', function() {
           var $A = Mock$A;
           var testObject;

           var result = $A.util.isUndefined(testObject);

           assert.ok(result);
        });

        it('should return false if object is not undefined', function() {
            var $A = Mock$A;
            var testObject = {};

            var result = $A.util.isUndefined(testObject);

            assert.deepEqual(result, false);
        });
    });

    describe('#isUndefinedOrNull()', function() {
        it('should return true if undefined', function() {
            var $A = Mock$A;
            var testObject;

            var result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });

        it('should return false if object is not undefined', function() {
            var $A = Mock$A;
            var testObject = {};

            var result = $A.util.isUndefinedOrNull(testObject);

            assert.deepEqual(result, false);
        });

        it('should return true if object is null', function() {
            var $A = Mock$A;
            var testObject = null;

            var result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });
    });

    describe('#addClass()', function() {
        it('should add the specified css class to an element', function() {
            var component = MockComponent([], [
                {
                    name: 'testElement',
                    cssClasses: ''
                }
            ]),
                $A = Mock$A;
            var element = component.find('testElement');

            $A.util.addClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.ok(result);
        });
    });

    describe('#removeClass()', function() {
        it('should remove the specified css class from an element', function() {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A;
            var element = component.find('testElement');

            $A.util.removeClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.deepEqual(result, false);
        });
    });

    describe('#hasClass()', function() {
        it('should return true if the element has the css class', function() {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A;
            var element = component.find('testElement');

            var result = $A.util.hasClass(element, 'slds-test');

            assert.ok(result);
        });

        it('should return false if the element does not have the css class', function() {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                        cssClasses: 'slds-different'
                    }
                ]),
                $A = Mock$A;
            var element = component.find('testElement');

            var result = $A.util.hasClass(element, 'slds-test');

            assert.deepEqual(result, false);
        });
    });

    describe('#toggleClass()', function() {
        it('should remove the css class from the element if it has it', function() {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A;
            var element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.deepEqual(result, false);
        });

        it('should add the css class to the element if it does not have it', function() {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                        cssClasses: ''
                    }
                ]),
                $A = Mock$A;
            var element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.ok(result);
        });
    });

    describe('#getBooleanValue()', function() {
        it('should return false if value is falsy', function() {
            var $A = Mock$A,
                testValue = "";

            var result = $A.util.getBooleanValue(testValue);

            assert.deepEqual(result, false);
        });

        it('should return true if value is truthy', function() {
            var $A = Mock$A,
                testValue = "test string";

            var result = $A.util.getBooleanValue(testValue);

            assert.ok(result);
        });
    });
});