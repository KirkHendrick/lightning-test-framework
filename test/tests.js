/**
 * Created by khendrick on 9/7/16.
 */

var assert = require('assert'),
    MockApp = require('./../MockApp').MockApp,
    MockComponent = require('./../MockComponent').MockComponent,
    TestController = require('./../Controller').Controller,
    TestHelper = require('./../Helper').Helper,
    Mock$A = require('./../Mock$A').Mock$A;

describe('MockComponent', function () {
    describe('#MockComponent()', function () {
        it('creates a new MockComponent object without the new keyword', function () {
            var component = MockComponent();

            assert.deepEqual('object', typeof component)
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

            assert.deepEqual('testAttribute', testAttribute.name);
        });

        it('should retrieve the correct attribute value', function () {
            var component = MockComponent([
                {
                    name: 'testAttribute',
                    value: 'testValue'
                }
            ]);

            var testAttribute = component.get("v.testAttribute");

            assert.deepEqual('testValue', testAttribute.value);
        });

        it('should retrieve a controller method reference when specified with c.', function () {
            var component = MockComponent([], [], [], [], {
                    testMethod: function () {
                    }
                }),
                testMethod;

            testMethod = component.get("c.testMethod");

            assert.deepEqual('function', typeof testMethod);
        });

        it('should receive controller method response through a callback', function () {
            var $A = Mock$A(),
                testResponse,
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return 'testResponse'
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testResponse = response;
            });

            $A.enqueueAction(testMethod);

            assert.deepEqual('testResponse', testResponse);
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
            assert.deepEqual(newValue, testAttribute.value);
        });
    });

    describe('#find()', function () {
        it('should find the correct element by name', function () {
            var component = MockComponent([], [
                {
                    auraId: 'testElement'
                }
            ]);

            var testElement = component.find('testElement');

            assert.deepEqual('testElement', testElement.auraId);
        });
    });

    describe('#getEvent()', function () {
        it('should retrieve the correct event', function () {
            var component = MockComponent([], [], [
                {
                    name: 'testEvent',
                    event: 'testEventType',
                    action: function () {
                    }
                }
            ]);

            var testEvent = component.getEvent("testEvent");

            assert.deepEqual('testEvent', testEvent.name);
        });
    });

    describe('#getReference()', function () {
        it('should return a reference to a controller function, and execute it without error', function () {
            var component = MockComponent([], [], [], [], {
                    testMethod: function () {
                    }
                }),
                testMethod = component.getReference('c.testMethod');

            testMethod();

            assert.ok(true, 'did not throw error');
        });
    });

    describe('events', function () {
        it('should be able to fire events', function () {
            var eventFired = false,
                component = MockComponent([], [], [
                    {
                        name: 'testEvent',
                        type: 'testEventType',
                        fire: function () {
                            eventFired = true;
                        }
                    }
                ]),
                testEvent = component.getEvent('testEvent');

            testEvent.fire();

            assert.ok(eventFired);
        });

        it('should be able to handle events fired and registered from the same component', function () {
            var eventHandled = false,
                component = MockComponent([], [], [
                    {
                        name: 'testEvent',
                        type: 'testEventType'
                    }
                ], [
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: function () {
                            eventHandled = true;
                        }
                    }
                ]),
                testEvent = component.getEvent('testEvent');

            testEvent.fire();

            assert.ok(eventHandled);
        });

        it('should be able to handle multiple event handlers on the same event', function () {
            var firstEventHandled = false,
                secondEventHandled = false,
                component = MockComponent([], [], [
                    {
                        name: 'testEvent',
                        type: 'testEventType',
                    }
                ], [
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: function () {
                            firstEventHandled = true;
                        }
                    },
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: function () {
                            secondEventHandled = true;
                        }
                    }
                ]),
                testEvent = component.getEvent('testEvent');

            testEvent.fire();

            assert.ok(firstEventHandled);
            assert.ok(secondEventHandled);
        });
    });
});

describe('Controller', function () {
    describe('can use mock component', function () {
        it('should be able to use component #get() without error', function () {
            var component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                controller = TestController;

            controller.testGet(component);

            assert.ok(true, 'did not throw error');
        });

        it('should be able to use component #set() without error', function () {
            var component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                controller = TestController;

            controller.testSet(component);

            assert.ok(true, 'did not throw error');
        });

        it('should be able to use component #find() without error', function () {
            var component = MockComponent([], [
                    {
                        name: 'testElement',
                    }
                ]),
                controller = TestController;

            controller.testFind(component);

            assert.ok(true, 'did not throw error');
        });
    });

    describe('can use helper', function () {
        it('should be able to use helper testGet without error', function () {
            var component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                controller = TestController,
                helper = TestHelper;

            controller.testHelperGet(component, null, helper);

            assert.ok(true, 'did not throw error');
        });
    });

    describe('can use $A', function () {
        it('should be able to use $A.util.isUndefined without error', function () {
            var controller = TestController;

            controller.test$AisUndefined({});

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('Helper', function () {
    describe('can use mock component', function () {
        it('should be able to use component #get() without error', function () {
            var component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                helper = TestHelper;

            helper.testGet(component);

            assert.ok(true, 'did not throw error');
        });
    });

    describe('can use $A', function () {
        it('should be able to use $A.util.isUndefined without error', function () {
            var helper = TestHelper;

            helper.test$AisUndefined({});

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('$A', function () {
    describe('#enqueueAction()', function () {
        it('should invoke the action', function () {
            var $A = Mock$A(),
                actionInvoked = false,
                testAction = function () {
                    actionInvoked = true;
                };

            $A.enqueueAction(testAction);

            assert.ok(actionInvoked);
        });
    });

    describe('#createComponent()', function () {
        it('should invoke callback once finished', function () {
            var $A = Mock$A(),
                callbackInvoked = false;

            $A.createComponent('TestComponent', {}, function () {
                callbackInvoked = true;
            });

            assert.ok(callbackInvoked);
        });

        it('should return created component through the callback', function () {
            var $A = Mock$A(),
                testComponent;

            $A.createComponent('TestComponent', {},
                function callback(component) {
                    testComponent = component;
                }
            );

            var result = testComponent instanceof MockComponent;

            assert.ok(result);
        });

        it('should create a component with the specified ui attributes', function () {
            var $A = Mock$A(),
                testComponent,
                testElement;

            $A.createComponent('TestComponent',
                {'auraId': 'testElement'},
                function (component) {
                    testComponent = component;
                }
            );

            testElement = testComponent.find('testElement');

            assert.deepEqual('testElement', testElement.auraId);
        });
    });

    describe('#createComponents()', function () {
        it('should return components in the callback', function () {
            var $A = Mock$A(),
                testComponents = [],
                firstComponent = [],
                secondComponent = [],
                callback = function (components) {
                    testComponents = components;
                };

            $A.createComponents([firstComponent, secondComponent], callback);

            var results = testComponents.filter(function (cmp) {
                return cmp instanceof MockComponent;
            });

            results.forEach(function (result) {
                assert.ok(result);
            });
        });

        it('should create components with the specified ui attributes', function () {
            var $A = Mock$A(),
                testComponents = [],
                firstComponent = ['TestComponent', {'auraId': 'firstElement'}],
                secondComponent = ['TestComponent', {'auraId': 'secondElement'}],
                callback = function (components) {
                    testComponents = components;
                },
                firstElement,
                secondElement;

            $A.createComponents([firstComponent, secondComponent], callback);

            firstElement = testComponents[0].find('firstElement');
            secondElement = testComponents[1].find('secondElement');

            assert.deepEqual('firstElement', firstElement.auraId);
            assert.deepEqual('secondElement', secondElement.auraId);
        });
    });

    describe('#get()', function () {
        it('should get an application event', function () {
            var app = MockApp([
                    {
                        name: 'appEvent'
                    }
                ]),
                $A = Mock$A(app);

            var appEvent = $A.get('e.c:appEvent');

            assert.deepEqual('appEvent', appEvent.name);
        });
    })
});

describe('$A.util', function () {
    describe('#isUndefined()', function () {
        it('should return true if object is undefined', function () {
            var $A = Mock$A(),
                testObject,
                result = $A.util.isUndefined(testObject);

            assert.ok(result);
        });

        it('should return false if object is not undefined', function () {
            var $A = Mock$A(),
                testObject = {},
                result = $A.util.isUndefined(testObject);

            assert.deepEqual(false, result);
        });
    });

    describe('#isUndefinedOrNull()', function () {
        it('should return true if undefined', function () {
            var $A = Mock$A(),
                testObject,
                result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });

        it('should return false if object is not undefined', function () {
            var $A = Mock$A(),
                testObject = {},
                result = $A.util.isUndefinedOrNull(testObject);

            assert.deepEqual(false, result);
        });

        it('should return true if object is null', function () {
            var $A = Mock$A(),
                testObject = null,
                result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });
    });

    describe('#addClass()', function () {
        it('should add the specified css class to an element', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: ''
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.addClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.ok(result);
        });
    });

    describe('#removeClass()', function () {
        it('should remove the specified css class from an element', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.removeClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.deepEqual(false, result);
        });
    });

    describe('#hasClass()', function () {
        it('should return true if the element has the css class', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            var result = $A.util.hasClass(element, 'slds-test');

            assert.ok(result);
        });

        it('should return false if the element does not have the css class', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-different'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            var result = $A.util.hasClass(element, 'slds-test');

            assert.deepEqual(false, result);
        });
    });

    describe('#toggleClass()', function () {
        it('should remove the css class from the element if it has it', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.deepEqual(false, result);
        });

        it('should add the css class to the element if it does not have it', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: ''
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.ok(result);
        });
    });

    describe('#getBooleanValue()', function () {
        it('should return false if value is falsy', function () {
            var $A = Mock$A(),
                testValue = "";

            var result = $A.util.getBooleanValue(testValue);

            assert.deepEqual(false, result);
        });

        it('should return true if value is truthy', function () {
            var $A = Mock$A(),
                testValue = "test string";

            var result = $A.util.getBooleanValue(testValue);

            assert.ok(result);
        });
    });

    describe('#isArray()', function () {
        it('should return false if value is not an array', function () {
            var $A = Mock$A(),
                testValue = "";

            var result = $A.util.isArray(testValue);

            assert.deepEqual(false, result);
        });

        it('should return true if value is an array', function () {
            var $A = Mock$A(),
                testValue = [];

            var result = $A.util.isArray(testValue);

            assert.ok(result);
        });
    });

    describe('#isEmpty()', function () {
        it('should return false if value is not empty', function () {
            var $A = Mock$A(),
                testValue = "test";

            var result = $A.util.isEmpty(testValue);

            assert.deepEqual(false, result);
        });

        it('should return true if value is an empty array', function () {
            var $A = Mock$A(),
                testValue = [];

            var result = $A.util.isEmpty(testValue);

            assert.ok(result);
        });

        it('should return true if value is undefined', function () {
            var $A = Mock$A(),
                testValue = undefined;

            var result = $A.util.isEmpty(testValue);

            assert.ok(result);
        });

        it('should return true if value is null', function () {
            var $A = Mock$A(),
                testValue = null;

            var result = $A.util.isEmpty(testValue);

            assert.ok(result);
        });

        it('should return false if value is a non-empty array', function () {
            var $A = Mock$A(),
                testValue = ['test'];

            var result = $A.util.isEmpty(testValue);

            assert.deepEqual(false, result);
        });
    });

    describe('#isObject()', function () {
        it('should return false if value is falsy', function () {
            var $A = Mock$A(),
                testValue = null;

            var result = $A.util.isObject(testValue);

            assert.deepEqual(false, result);
        });

        it('should return true if value is an empty object', function () {
            var $A = Mock$A(),
                testValue = {};

            var result = $A.util.isObject(testValue);

            assert.ok(result);
        });

        it('should return false if value is an array', function () {
            var $A = Mock$A(),
                testValue = [];

            var result = $A.util.isObject(testValue);

            assert.deepEqual(false, result);
        });

        it('should return false if value is a function', function () {
            var $A = Mock$A(),
                testValue = function () {
                };

            var result = $A.util.isObject(testValue);

            assert.deepEqual(false, result);
        });

        it('should return false if value is a string', function () {
            var $A = Mock$A(),
                testValue = "test string";

            var result = $A.util.isObject(testValue);

            assert.deepEqual(false, result);
        });

        it('should return false if value is a number', function () {
            var $A = Mock$A(),
                testValue = 8;

            var result = $A.util.isObject(testValue);

            assert.deepEqual(false, result);
        });
        //TODO: it('should return false if value is a DOM element', function() { });
    });
});

describe('App', function () {
    describe('events', function () {
        it('should be able to register events and handle them using $A.get()', function () {
            var eventHandled = false;
            var app = MockApp([
                    {
                        name: 'testEvent'
                    }],
                [{
                    name: 'testEvent',
                    action: function () {
                        eventHandled = true;
                    }
                }]),
                $A = Mock$A(app);

            var testEvent = $A.get('e.c:testEvent');

            testEvent.fire();

            assert.ok(eventHandled);
        });
    });
});
