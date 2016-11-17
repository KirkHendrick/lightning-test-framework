const assert = require('assert'),
    ltf = require('../index'),
    TestController = require('../build/TestController').Controller,
    TestHelper = require('../build/TestHelper').Helper,
    TestRenderer = require('../build/TestRenderer').Renderer;

const MockApp = ltf.MockApp,
    MockComponent = ltf.MockComponent,
    Mock$A = ltf.Mock$A;

describe('MockComponent', function () {
    describe('#MockComponent()', function () {
        it('creates a new MockComponent object without the new keyword', function () {
            const component = MockComponent();

            assert.deepEqual('object', typeof component)
        });

        it('can create a MockComponent object using an object with default parameters', function () {
            const component = MockComponent({
                    attributes: [{
                        name: 'testAttribute',
                        value: 'testValue'
                    }],
                    registeredEvents: [{
                        name: 'testEvent',
                        event: 'testEventType',
                        action: function () {
                        }
                    }]
                }),
                testAttribute = component.get('v.testAttribute'),
                testEvent = component.getEvent('testEvent');

            assert.deepEqual('testValue', testAttribute);
            assert.deepEqual('function', typeof testEvent.fire);
        });
    });

    describe('#get()', function () {
        it('should retrieve the correct attribute', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                testAttribute = component.get("v.testAttribute");

            assert.deepEqual('testValue', testAttribute);
        });

        it('should retrieve an apex controller method reference when specified with c.', function () {
            const component = MockComponent({
                    apexController: {
                        testMethod: function () {
                        }
                    }
                }),
                testMethod = component.get("c.testMethod");

            assert.deepEqual('function', typeof testMethod);
        });

        it('should receive controller method response through a callback', function () {
            var testResponse;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return 'testResponse'
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testResponse = response.getReturnValue();
            });

            $A.enqueueAction(testMethod);

            assert.deepEqual('testResponse', testResponse);
        });

        it('should pass in arguments to action using setParams', function () {
            var testResponse;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function (input) {
                        return input;
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setParams({input: 'testResponse'});

            testMethod.setCallback(this, function (response) {
                testResponse = response.getReturnValue();
            });


            $A.enqueueAction(testMethod);

            assert.deepEqual('testResponse', testResponse);
        });

        it('should pass in multiple arguments to action using setParams', function () {
            var testResponse;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function (input1, input2) {
                        return input1 + input2;
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setParams({
                input1: 'test',
                input2: 'Response'
            });

            testMethod.setCallback(this, function (response) {
                testResponse = response.getReturnValue();
            });


            $A.enqueueAction(testMethod);

            assert.deepEqual('testResponse', testResponse);
        });

        it('should get the value of a property of an object using dot notation', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: {
                            id: 'testValue'
                        }
                    }
                ]),
                testAttributeId = component.get("v.testAttribute.id");

            assert.deepEqual('testValue', testAttributeId);
        });

        it('should get the value of a property of an object using dot notation if nested', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: {
                            id: {
                                number: 'testValue'
                            }
                        }
                    }
                ]),
                testAttributeIdNumber = component.get("v.testAttribute.id.number");

            assert.deepEqual('testValue', testAttributeIdNumber);
        });
    });

    describe('#set()', function () {
        it('should change the value of the correct attribute', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: 'testValue'
                    }
                ]),
                newValue = 'newValue';

            component.set("v.testAttribute", newValue);

            const testAttribute = component.get("v.testAttribute");
            assert.deepEqual(newValue, testAttribute);
        });
    });

    describe('#find()', function () {
        it('should find the correct element by name', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement'
                    }
                ]),
                testElement = component.find('testElement');

            assert.deepEqual('testElement', testElement.auraId);
        });
    });

    describe('#getEvent()', function () {
        it('should retrieve the correct event', function () {
            const component = MockComponent([], [], [
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: function () {
                        }
                    }
                ]),
                testEvent = component.getEvent("testEvent");

            assert.deepEqual('testEvent', testEvent.name);
        });
    });

    describe('#getReference()', function () {
        it('should return a reference to a controller function, and execute it without error', function () {
            const component = MockComponent([], [], [], [], {
                    testMethod: function () {
                    }
                }),
                testMethod = component.getReference('c.testMethod');

            testMethod();

            assert.ok(true, 'did not throw error');
        });
    });

    describe('#isValid()', function () {
        it('should return true', function () {
            const component = MockComponent();

            assert.ok(component.isValid());
        });
    });
});

describe('Events', function () {
    it('should be able to fire events', function () {
        const component = MockComponent([], [], [
                {
                    name: 'testEvent',
                    type: 'testEventType'
                }
            ]),
            testEvent = component.getEvent('testEvent');

        assert.deepEqual('function', typeof testEvent.fire);
    });

    it('should not be able to fire events that have not been registered', function () {
        const component = MockComponent();

        try {
            component.getEvent('testEvent').fire();
        }
        catch (e) {
            assert.deepEqual('event "testEvent" is not registered', e.message);
        }
    });

    it('should be able to handle events fired and registered from the same component', function () {
        const component = MockComponent({
                attributes: [{
                    name: 'eventHandled', value: false
                }],
                registeredEvents: [{
                    name: 'testEvent',
                    type: 'testEventType'
                }],
                eventHandlers: [{
                    name: 'testEvent',
                    event: 'testEventType',
                    action: 'c.testEventHandled'
                }],
                controller: TestController
            }),
            testEvent = component.getEvent('testEvent');

        testEvent.fire();

        assert.ok(component.get('v.eventHandled'));
    });

    it('should be able to handle multiple event handlers on the same event', function () {
        const component = MockComponent({
                attributes: [
                    {name: 'eventHandled', value: false},
                    {name: 'secondEventHandled', value: false}
                ],
                registeredEvents: [{name: 'testEvent', type: 'testEventType'}],
                eventHandlers: [
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: 'c.testEventHandled'
                    },
                    {
                        name: 'testEvent',
                        event: 'testEventType',
                        action: 'c.testSecondEventHandled'
                    }
                ],
                controller: TestController
            }),
            testEvent = component.getEvent('testEvent');

        testEvent.fire();

        assert.ok(component.get('v.eventHandled'));
        assert.ok(component.get('v.secondEventHandled'));
    });

    it('should be able to pass parameters into events', function () {
        const component = MockComponent({
            attributes: [{
                name: 'testParam',
                value: false
            }],
            registeredEvents: [{
                name: 'testEvent',
                type: 'testEventType'
            }],
            eventHandlers: [{
                name: 'testEvent',
                event: 'testEventType',
                action: 'c.testEventParams'
            }],
            controller: TestController
        });

        component
            .getEvent('testEvent')
            .setParams({
                testParam: true
            })
            .fire();

        assert.ok(component.get('v.testParam'));
    });

    it('should pass the component helper into event handlers', function () {
        const component = MockComponent({
            attributes: [{
                name: 'testParam',
                value: false
            }],
            registeredEvents: [{
                name: 'testEvent',
                type: 'testEventType'
            }],
            eventHandlers: [{
                name: 'testEvent',
                event: 'testEventType',
                action: 'c.testEventParamsHelper'
            }],
            controller: TestController,
            helper: TestHelper
        });

        component
            .getEvent('testEvent')
            .setParams({
                testParam: true
            })
            .fire();

        assert.ok(component.get('v.testParam'));
    });

    it('should be able to call event.stopPropagation()', function () {
        const component = MockComponent({
            attributes: [{
                name: 'testParam',
                value: false
            }],
            registeredEvents: [{
                name: 'testEvent',
                type: 'testEventType'
            }],
            eventHandlers: [{
                name: 'testEvent',
                event: 'testEventType',
                action: 'c.testStopEventPropagation'
            }],
            controller: TestController,
            helper: TestHelper
        });

        component
            .getEvent('testEvent')
            .setParams({
                testParam: true
            })
            .fire();

        assert.ok(component.get('v.testParam'));
    });
});

describe('Controller', function () {
    describe('can use mock component', function () {
        it('should be able to use component #get() without error', function () {
            const component = MockComponent([
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
            const component = MockComponent([
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
            const component = MockComponent({
                    elements: [
                        {auraId: 'testElement'}
                    ]
                }),
                controller = TestController;

            controller.testFind(component);

            assert.ok(true, 'did not throw error');
        });
    });

    describe('can use helper', function () {
        it('should be able to use helper testGet without error', function () {
            const component = MockComponent([
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

        it('should be able to read script-made helper', function () {
            const helper = TestHelper;

            assert.ok(helper.testScript());
        });
    });

    describe('can use $A', function () {
        it('should be able to use $A.util.isUndefined without error', function () {
            const controller = TestController;

            controller.test$AisUndefined({});

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('Helper', function () {
    describe('can use mock component', function () {
        it('should be able to use component #get() without error', function () {
            const component = MockComponent([
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
            const helper = TestHelper;

            helper.test$AisUndefined({});

            assert.ok(true, 'did not throw error');
        });
    });
});

describe('Renderer', function () {
    describe('can call rendering lifecycle super methods', function () {
        it('should be able to use superAfterRender()', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: false
                    }
                ]),
                renderer = TestRenderer;

            renderer.afterRender(component);

            assert.ok(component.get('v.testAttribute'));
        });

        it('should be able to use superRerender()', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: false
                    }
                ]),
                renderer = TestRenderer;

            renderer.rerender(component);

            assert.ok(component.get('v.testAttribute'));
        });

        it('should be able to use superUnrender()', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: false
                    }
                ]),
                renderer = TestRenderer;

            renderer.unrender(component);

            assert.ok(component.get('v.testAttribute'));
        });

        it('should be able to use superRender()', function () {
            const component = MockComponent([
                    {
                        name: 'testAttribute',
                        value: false
                    }
                ]),
                renderer = TestRenderer;

            renderer.render(component);

            assert.ok(component.get('v.testAttribute'));
        });
    });
});

describe('$A', function () {
    describe('#enqueueAction()', function () {
        it('should invoke the action', function () {
            var actionInvoked = false;
            const $A = Mock$A(),
                testAction = function () {
                    actionInvoked = true;
                };

            $A.enqueueAction(testAction);

            assert.ok(actionInvoked);
        });

        it('should set the return value from response using getReturnValue', function () {
            var testResponse;
            const $A = Mock$A(),
                component = MockComponent({
                    apexController: {
                        testMethod: function () {
                            return 'testResponse'
                        }
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testResponse = response.getReturnValue();
            });

            $A.enqueueAction(testMethod);

            assert.deepEqual('testResponse', testResponse);
        });

        it('should set the error value from response using getError', function () {
            var testErrors;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return;
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testErrors = response.getError();
            });

            $A.enqueueAction(testMethod);

            assert.ok(testErrors);
        });

        it('should set the error message if not successful', function () {
            var testErrors;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return;
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testErrors = response.getError();
            });

            $A.enqueueAction(testMethod);

            assert.ok(testErrors[0].message);
        });

        it('should set the return state to success if successful', function () {
            var testState;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return 'testResponse'
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testState = response.getState();
            });

            $A.enqueueAction(testMethod);

            assert.deepEqual('SUCCESS', testState);
        });

        it('should set the return state to error if not successful', function () {
            var testState;
            const $A = Mock$A(),
                component = MockComponent([], [], [], [], {
                    testMethod: function () {
                        return;
                    }
                }),
                testMethod = component.get("c.testMethod");

            testMethod.setCallback(this, function (response) {
                testState = response.getState();
            });

            $A.enqueueAction(testMethod);

            assert.deepEqual('ERROR', testState);
        });
    });

    describe('#createComponent()', function () {
        it('should invoke callback once finished', function () {
            var callbackInvoked = false;
            const $A = Mock$A();

            $A.createComponent('TestComponent', {}, function () {
                callbackInvoked = true;
            });

            assert.ok(callbackInvoked);
        });

        it('should return created component through the callback', function () {
            var testComponent;
            const $A = Mock$A();

            $A.createComponent('TestComponent', {},
                function callback(component) {
                    testComponent = component;
                }
            );

            assert.ok(testComponent instanceof MockComponent);
        });

        it('should create a component with the specified ui attributes', function () {
            var testComponent,
                testElement;
            const $A = Mock$A();

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
            var testComponents = [];
            const $A = Mock$A(),
                firstComponent = [],
                secondComponent = [],
                callback = function (components) {
                    testComponents = components;
                };

            $A.createComponents([firstComponent, secondComponent], callback);

            const results = testComponents.filter(function (cmp) {
                return cmp instanceof MockComponent;
            });

            assert.ok(results.length > 0);

            results.forEach(function (result) {
                assert.ok(result);
            });
        });

        it('should create components with the specified ui attributes', function () {
            var firstElement,
                secondElement,
                testComponents = [];
            const $A = Mock$A(),
                firstComponent = ['TestComponent', {'auraId': 'firstElement'}],
                secondComponent = ['TestComponent', {'auraId': 'secondElement'}],
                callback = function (components) {
                    testComponents = components;
                };

            $A.createComponents([firstComponent, secondComponent], callback);

            firstElement = testComponents[0].find('firstElement');
            secondElement = testComponents[1].find('secondElement');

            assert.deepEqual('firstElement', firstElement.auraId);
            assert.deepEqual('secondElement', secondElement.auraId);
        });
    });

    describe('#get()', function () {
        it('should get an application event', function () {
            const app = MockApp([
                    {
                        name: 'appEvent'
                    }
                ], MockComponent()),
                $A = Mock$A(app),
                appEvent = $A.get('e.c:appEvent');

            assert.deepEqual('appEvent', appEvent.name);
        });
    });
});

describe('$A.util', function () {
    describe('#isUndefined()', function () {
        it('should return true if object is undefined', function () {
            var testObject;
            const $A = Mock$A(),
                result = $A.util.isUndefined(testObject);

            assert.ok(result);
        });

        it('should return false if object is not undefined', function () {
            const $A = Mock$A(),
                testObject = {},
                result = $A.util.isUndefined(testObject);

            assert.deepEqual(false, result);
        });
    });

    describe('#isUndefinedOrNull()', function () {
        it('should return true if undefined', function () {
            var testObject;
            const $A = Mock$A(),
                result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });

        it('should return false if object is not undefined', function () {
            const $A = Mock$A(),
                testObject = {},
                result = $A.util.isUndefinedOrNull(testObject);

            assert.deepEqual(false, result);
        });

        it('should return true if object is null', function () {
            const $A = Mock$A(),
                testObject = null,
                result = $A.util.isUndefinedOrNull(testObject);

            assert.ok(result);
        });
    });

    describe('#addClass()', function () {
        it('should add the specified css class to an element', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: ''
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.addClass(element, 'slds-test');

            assert.ok(~element.cssClasses.indexOf('slds-test'));
        });
    });

    describe('#removeClass()', function () {
        it('should remove the specified css class from an element', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.removeClass(element, 'slds-test');

            assert.deepEqual(false, ~element.cssClasses.indexOf('slds-test'));
        });

        it('should remove class when multiple classes are passed in', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.removeClass(element, 'slds-test slds-test2');

            var result = ~element.cssClasses.indexOf('slds-test');

            assert.deepEqual(false, result);
        });

        it('should remove multiple classes when multiple classes are passed in', function () {
            var component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test slds-test2'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.removeClass(element, 'slds-test slds-test2');

            assert.deepEqual(false, ~element.cssClasses.indexOf('slds-test'));
            assert.deepEqual(false, ~element.cssClasses.indexOf('slds-test2'));
        });
    });

    describe('#hasClass()', function () {
        it('should return true if the element has the css class', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            assert.ok($A.util.hasClass(element, 'slds-test'));
        });

        it('should return false if the element does not have the css class', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-different'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            assert.deepEqual(false, $A.util.hasClass(element, 'slds-test'));
        });
    });

    describe('#toggleClass()', function () {
        it('should remove the css class from the element if it has it', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: 'slds-test'
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            assert.deepEqual(false, ~element.cssClasses.indexOf('slds-test'));
        });

        it('should add the css class to the element if it does not have it', function () {
            const component = MockComponent([], [
                    {
                        auraId: 'testElement',
                        cssClasses: ''
                    }
                ]),
                $A = Mock$A(),
                element = component.find('testElement');

            $A.util.toggleClass(element, 'slds-test');

            assert.ok(~element.cssClasses.indexOf('slds-test'));
        });
    });

    describe('#getBooleanValue()', function () {
        it('should return false if value is falsy', function () {
            const $A = Mock$A(),
                testValue = "";

            assert.deepEqual(false, $A.util.getBooleanValue(testValue));
        });

        it('should return true if value is truthy', function () {
            const $A = Mock$A(),
                testValue = "test string";

            assert.ok($A.util.getBooleanValue(testValue));
        });
    });

    describe('#isArray()', function () {
        it('should return false if value is not an array', function () {
            const $A = Mock$A(),
                testValue = "";

            assert.deepEqual(false, $A.util.isArray(testValue));
        });

        it('should return true if value is an array', function () {
            const $A = Mock$A(),
                testValue = [];

            assert.ok($A.util.isArray(testValue));
        });
    });

    describe('#isEmpty()', function () {
        it('should return false if value is not empty', function () {
            const $A = Mock$A(),
                testValue = "test";

            assert.deepEqual(false, $A.util.isEmpty(testValue));
        });

        it('should return true if value is an empty array', function () {
            const $A = Mock$A(),
                testValue = [];

            assert.ok($A.util.isEmpty(testValue));
        });

        it('should return true if value is undefined', function () {
            const $A = Mock$A(),
                testValue = undefined;

            assert.ok($A.util.isEmpty(testValue));
        });

        it('should return true if value is null', function () {
            const $A = Mock$A(),
                testValue = null;

            assert.ok($A.util.isEmpty(testValue));
        });

        it('should return false if value is a non-empty array', function () {
            const $A = Mock$A(),
                testValue = ['test'];

            assert.deepEqual(false, $A.util.isEmpty(testValue));
        });
    });

    describe('#isObject()', function () {
        it('should return false if value is falsy', function () {
            const $A = Mock$A(),
                testValue = null;

            assert.deepEqual(false, $A.util.isObject(testValue));
        });

        it('should return true if value is an empty object', function () {
            const $A = Mock$A(),
                testValue = {};

            assert.ok($A.util.isObject(testValue));
        });

        it('should return false if value is an array', function () {
            const $A = Mock$A(),
                testValue = [];

            assert.deepEqual(false, $A.util.isObject(testValue));
        });

        it('should return false if value is a function', function () {
            const $A = Mock$A(),
                testValue = function () {
                };

            assert.deepEqual(false, $A.util.isObject(testValue));
        });

        it('should return false if value is a string', function () {
            const $A = Mock$A(),
                testValue = "test string";

            assert.deepEqual(false, $A.util.isObject(testValue));
        });

        it('should return false if value is a number', function () {
            const $A = Mock$A(),
                testValue = 8;

            assert.deepEqual(false, $A.util.isObject(testValue));
        });
        //TODO: it('should return false if value is a DOM element', function() { });
    });
});

describe('App', function () {
    describe('events', function () {
        it('should be able to register events and handle them using $A.get()', function () {
            const component = MockComponent({
                    attributes: [{name: 'eventHandled', value: false}],
                    eventHandlers: [{
                        name: 'testEvent',
                        action: 'c.testEventHandled'
                    }],
                    controller: TestController
                }),
                app = MockApp([{name: 'testEvent'}], component),
                $A = Mock$A(app),
                testEvent = $A.get('e.c:testEvent');

            testEvent.fire();

            assert.ok(component.get('v.eventHandled'));
        });

        it('should not be able to fire events that have not been registered', function () {
            const app = MockApp(),
                $A = Mock$A(app),
                testEvent = $A.get('e.c:testEvent');

            assert.deepEqual(null, testEvent);
        });

        it('should not be able to fire events if there is no app created', function () {
            const $A = Mock$A(),
                testEvent = $A.get('e.c:testEvent');

            assert.deepEqual(null, testEvent);
        });

        it('should be able to pass parameters into events', function () {
            const component = MockComponent({
                    attributes: [{
                        name: 'testParam',
                        value: false
                    }],
                    eventHandlers: [{
                        name: 'testEvent',
                        event: 'testEventType',
                        action: 'c.testEventParams'
                    }],
                    controller: TestController
                }),
                app = MockApp([{name: 'testEvent'}], component),
                $A = Mock$A(app),
                testEvent = $A.get('e.c:testEvent');

            testEvent
                .setParams({
                    testParam: true
                })
                .fire();

            assert.ok(component.get('v.testParam'));
        });
    });
});

describe('Error Handling', function () {
    it('should display which attribute is missing', function () {
        const component = MockComponent({
            attributes: []
        });

        try {
            component.get('v.testAttribute');
        }
        catch (e) {
            assert.deepEqual('attribute "testAttribute" is not defined', e.message);
        }
    });

    it('should display which element is missing', function () {
        const component = MockComponent({
            elements: []
        });

        try {
            component.find('testElement');
        }
        catch (e) {
            assert.deepEqual('element "testElement" is not defined', e.message);
        }
    });

    it('should display which event is not registered', function () {
        const component = MockComponent({
            eventHandlers: [
                {name: 'testEvent', action: 'c.testEventHandled'}
            ]
        });

        try {
            component.getEvent('testEvent').fire();
        }
        catch (e) {
            assert.deepEqual('event "testEvent" is not registered', e.message);
        }
    });

    it('should display which apex controller method does not exist', function () {
        const component = MockComponent({
            apexController: {}
        });

        try {
            component.get('c.testMethod');
        }
        catch (e) {
            assert.deepEqual('action "testMethod" is not defined', e.message);
        }
    });

    it('should display which controller event handler does not exist', function () {
        const component = MockComponent({
            registeredEvents: [
                {name: 'testEvent'}
            ],
            eventHandlers: [
                {name: 'testEvent', action: 'c.testEventHandler'}
            ]
        });

        try {
            component.getEvent('testEvent').fire();
        }
        catch (e) {
            assert.deepEqual('controller method "testEventHandler" does not exist', e.message);
        }
    });
});