# TOC
   - [MockComponent](#mockcomponent)
     - [#MockComponent()](#mockcomponent-mockcomponent)
     - [#get()](#mockcomponent-get)
     - [#set()](#mockcomponent-set)
     - [#find()](#mockcomponent-find)
     - [#getEvent()](#mockcomponent-getevent)
     - [#getReference()](#mockcomponent-getreference)
     - [#isValid()](#mockcomponent-isvalid)
   - [Inheritance](#inheritance)
   - [Events](#events)
   - [Controller](#controller)
     - [can use mock component](#controller-can-use-mock-component)
     - [can use helper](#controller-can-use-helper)
     - [can use $A](#controller-can-use-a)
   - [Helper](#helper)
     - [can use mock component](#helper-can-use-mock-component)
     - [can use $A](#helper-can-use-a)
   - [Renderer](#renderer)
     - [can call rendering lifecycle super methods](#renderer-can-call-rendering-lifecycle-super-methods)
   - [$A](#a)
     - [#enqueueAction()](#a-enqueueaction)
     - [#createComponent()](#a-createcomponent)
     - [#createComponents()](#a-createcomponents)
     - [#get()](#a-get)
     - [#getCallback()](#a-getcallback)
   - [$A.util](#autil)
     - [#isUndefined()](#autil-isundefined)
     - [#isUndefinedOrNull()](#autil-isundefinedornull)
     - [#addClass()](#autil-addclass)
     - [#removeClass()](#autil-removeclass)
     - [#hasClass()](#autil-hasclass)
     - [#toggleClass()](#autil-toggleclass)
     - [#getBooleanValue()](#autil-getbooleanvalue)
     - [#isArray()](#autil-isarray)
     - [#isEmpty()](#autil-isempty)
     - [#isObject()](#autil-isobject)
   - [App](#app)
     - [events](#app-events)
   - [Error Handling](#error-handling)
<a name=""></a>
 
<a name="mockcomponent"></a>
# MockComponent
<a name="mockcomponent-mockcomponent"></a>
## #MockComponent()
creates a new MockComponent object without the new keyword.

```js
const component = MockComponent();
assert.deepEqual('object', typeof component)
```

can create a MockComponent object using an object with default parameters.

```js
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
```

<a name="mockcomponent-get"></a>
## #get()
should retrieve the correct attribute.

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: 'testValue'
        }
    ]),
    testAttribute = component.get("v.testAttribute");
assert.deepEqual('testValue', testAttribute);
```

should retrieve an apex controller method reference when specified with c..

```js
const component = MockComponent({
        apexController: {
            testMethod: function () {
            }
        }
    }),
    testMethod = component.get("c.testMethod");
assert.deepEqual('function', typeof testMethod);
```

should receive controller method response through a callback.

```js
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
```

should pass in arguments to action using setParams.

```js
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
```

should pass in multiple arguments to action using setParams.

```js
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
```

should get the value of a property of an object using dot notation.

```js
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
```

should get the value of a property of an object using dot notation if nested.

```js
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
```

<a name="mockcomponent-set"></a>
## #set()
should change the value of the correct attribute.

```js
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
```

<a name="mockcomponent-find"></a>
## #find()
should find the correct element by name.

```js
const component = MockComponent([], [
        {
            auraId: 'testElement'
        }
    ]),
    testElement = component.find('testElement');
assert.deepEqual('testElement', testElement.auraId);
```

<a name="mockcomponent-getevent"></a>
## #getEvent()
should retrieve the correct event.

```js
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
```

<a name="mockcomponent-getreference"></a>
## #getReference()
should return a reference to a controller function, and execute it without error.

```js
const component = MockComponent([], [], [], [], {
        testMethod: function () {
        }
    }),
    testMethod = component.getReference('c.testMethod');
testMethod();
assert.ok(true, 'did not throw error');
```

<a name="mockcomponent-isvalid"></a>
## #isValid()
should return true.

```js
const component = MockComponent();
assert.ok(component.isValid());
```

<a name="inheritance"></a>
# Inheritance
should accept a list of components that it inherits from, and can reference helper methods and attributes.

```js
const component = MockComponent({
        extendsFrom: [
            MockComponent({
                attributes: [
                    {name: 'testSuperAttribute', value: true}
                ],
                helper: TestSuperComponentHelper
            })
        ],
        helper: TestHelper
    }),
    helper = TestHelper;
const result = helper.testSuper(component, helper);
assert.ok(result);
```

<a name="events"></a>
# Events
should be able to fire events.

```js
const component = MockComponent([], [], [
        {
            name: 'testEvent',
            type: 'testEventType'
        }
    ]),
    testEvent = component.getEvent('testEvent');
assert.deepEqual('function', typeof testEvent.fire);
```

should not be able to fire events that have not been registered.

```js
const component = MockComponent();
try {
    component.getEvent('testEvent').fire();
}
catch (e) {
    assert.deepEqual('event "testEvent" is not registered', e.message);
}
```

should be able to handle events fired and registered from the same component.

```js
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
```

should be able to handle multiple event handlers on the same event.

```js
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
```

should be able to pass parameters into events.

```js
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
```

should pass the component helper into event handlers.

```js
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
```

should be able to call event.stopPropagation().

```js
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
```

<a name="controller"></a>
# Controller
<a name="controller-can-use-mock-component"></a>
## can use mock component
should be able to use component #get() without error.

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: 'testValue'
        }
    ]),
    controller = TestController;
controller.testGet(component);
assert.ok(true, 'did not throw error');
```

should be able to use component #set() without error.

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: 'testValue'
        }
    ]),
    controller = TestController;
controller.testSet(component);
assert.ok(true, 'did not throw error');
```

should be able to use component #find() without error.

```js
const component = MockComponent({
        elements: [
            {auraId: 'testElement'}
        ]
    }),
    controller = TestController;
controller.testFind(component);
assert.ok(true, 'did not throw error');
```

<a name="controller-can-use-helper"></a>
## can use helper
should be able to use helper testGet without error.

```js
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
```

should be able to read script-made helper.

```js
const helper = TestHelper;
assert.ok(helper.testScript());
```

<a name="controller-can-use-a"></a>
## can use $A
should be able to use $A.util.isUndefined without error.

```js
const controller = TestController;
controller.test$AisUndefined({});
assert.ok(true, 'did not throw error');
```

<a name="helper"></a>
# Helper
<a name="helper-can-use-mock-component"></a>
## can use mock component
should be able to use component #get() without error.

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: 'testValue'
        }
    ]),
    helper = TestHelper;
helper.testGet(component);
assert.ok(true, 'did not throw error');
```

<a name="helper-can-use-a"></a>
## can use $A
should be able to use $A.util.isUndefined without error.

```js
const helper = TestHelper;
helper.test$AisUndefined({});
assert.ok(true, 'did not throw error');
```

<a name="renderer"></a>
# Renderer
<a name="renderer-can-call-rendering-lifecycle-super-methods"></a>
## can call rendering lifecycle super methods
should be able to use superAfterRender().

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: false
        }
    ]),
    renderer = TestRenderer;
renderer.afterRender(component);
assert.ok(component.get('v.testAttribute'));
```

should be able to use superRerender().

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: false
        }
    ]),
    renderer = TestRenderer;
renderer.rerender(component);
assert.ok(component.get('v.testAttribute'));
```

should be able to use superUnrender().

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: false
        }
    ]),
    renderer = TestRenderer;
renderer.unrender(component);
assert.ok(component.get('v.testAttribute'));
```

should be able to use superRender().

```js
const component = MockComponent([
        {
            name: 'testAttribute',
            value: false
        }
    ]),
    renderer = TestRenderer;
renderer.render(component);
assert.ok(component.get('v.testAttribute'));
```

<a name="a"></a>
# $A
<a name="a-enqueueaction"></a>
## #enqueueAction()
should invoke the action.

```js
var actionInvoked = false;
const $A = Mock$A(),
    testAction = function () {
        actionInvoked = true;
    };
$A.enqueueAction(testAction);
assert.ok(actionInvoked);
```

should set the return value from response using getReturnValue.

```js
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
```

should set the error value from response using getError.

```js
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
```

should set the error message if not successful.

```js
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
```

should set the return state to success if successful.

```js
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
```

should set the return state to error if not successful.

```js
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
```

<a name="a-createcomponent"></a>
## #createComponent()
should invoke callback once finished.

```js
var callbackInvoked = false;
const $A = Mock$A();
$A.createComponent('TestComponent', {}, function () {
    callbackInvoked = true;
});
assert.ok(callbackInvoked);
```

should return created component through the callback.

```js
var testComponent;
const $A = Mock$A();
$A.createComponent('TestComponent', {},
    function callback(component) {
        testComponent = component;
    }
);
assert.ok(testComponent instanceof MockComponent);
```

should create a component with the specified ui attributes.

```js
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
```

<a name="a-createcomponents"></a>
## #createComponents()
should return components in the callback.

```js
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
```

should create components with the specified ui attributes.

```js
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
```

<a name="a-get"></a>
## #get()
should get an application event.

```js
const app = MockApp([
        {
            name: 'appEvent'
        }
    ], MockComponent()),
    $A = Mock$A(app),
    appEvent = $A.get('e.c:appEvent');
assert.deepEqual('appEvent', appEvent.name);
```

<a name="a-getcallback"></a>
## #getCallback()
should execute the given function.

```js
var testFlag = false;
const $A = Mock$A(),
    callback = function () {
        testFlag = true;
    };
$A.getCallback(callback);
assert.ok(testFlag);
```

<a name="autil"></a>
# $A.util
<a name="autil-isundefined"></a>
## #isUndefined()
should return true if object is undefined.

```js
var testObject;
const $A = Mock$A(),
    result = $A.util.isUndefined(testObject);
assert.ok(result);
```

should return false if object is not undefined.

```js
const $A = Mock$A(),
    testObject = {},
    result = $A.util.isUndefined(testObject);
assert.deepEqual(false, result);
```

<a name="autil-isundefinedornull"></a>
## #isUndefinedOrNull()
should return true if undefined.

```js
var testObject;
const $A = Mock$A(),
    result = $A.util.isUndefinedOrNull(testObject);
assert.ok(result);
```

should return false if object is not undefined.

```js
const $A = Mock$A(),
    testObject = {},
    result = $A.util.isUndefinedOrNull(testObject);
assert.deepEqual(false, result);
```

should return true if object is null.

```js
const $A = Mock$A(),
    testObject = null,
    result = $A.util.isUndefinedOrNull(testObject);
assert.ok(result);
```

<a name="autil-addclass"></a>
## #addClass()
should add the specified css class to an element.

```js
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
```

<a name="autil-removeclass"></a>
## #removeClass()
should remove the specified css class from an element.

```js
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
```

should remove class when multiple classes are passed in.

```js
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
```

should remove multiple classes when multiple classes are passed in.

```js
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
```

<a name="autil-hasclass"></a>
## #hasClass()
should return true if the element has the css class.

```js
const component = MockComponent([], [
        {
            auraId: 'testElement',
            cssClasses: 'slds-test'
        }
    ]),
    $A = Mock$A(),
    element = component.find('testElement');
assert.ok($A.util.hasClass(element, 'slds-test'));
```

should return false if the element does not have the css class.

```js
const component = MockComponent([], [
        {
            auraId: 'testElement',
            cssClasses: 'slds-different'
        }
    ]),
    $A = Mock$A(),
    element = component.find('testElement');
assert.deepEqual(false, $A.util.hasClass(element, 'slds-test'));
```

<a name="autil-toggleclass"></a>
## #toggleClass()
should remove the css class from the element if it has it.

```js
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
```

should add the css class to the element if it does not have it.

```js
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
```

<a name="autil-getbooleanvalue"></a>
## #getBooleanValue()
should return false if value is falsy.

```js
const $A = Mock$A(),
    testValue = "";
assert.deepEqual(false, $A.util.getBooleanValue(testValue));
```

should return true if value is truthy.

```js
const $A = Mock$A(),
    testValue = "test string";
assert.ok($A.util.getBooleanValue(testValue));
```

<a name="autil-isarray"></a>
## #isArray()
should return false if value is not an array.

```js
const $A = Mock$A(),
    testValue = "";
assert.deepEqual(false, $A.util.isArray(testValue));
```

should return true if value is an array.

```js
const $A = Mock$A(),
    testValue = [];
assert.ok($A.util.isArray(testValue));
```

<a name="autil-isempty"></a>
## #isEmpty()
should return false if value is not empty.

```js
const $A = Mock$A(),
    testValue = "test";
assert.deepEqual(false, $A.util.isEmpty(testValue));
```

should return true if value is an empty array.

```js
const $A = Mock$A(),
    testValue = [];
assert.ok($A.util.isEmpty(testValue));
```

should return true if value is undefined.

```js
const $A = Mock$A(),
    testValue = undefined;
assert.ok($A.util.isEmpty(testValue));
```

should return true if value is null.

```js
const $A = Mock$A(),
    testValue = null;
assert.ok($A.util.isEmpty(testValue));
```

should return false if value is a non-empty array.

```js
const $A = Mock$A(),
    testValue = ['test'];
assert.deepEqual(false, $A.util.isEmpty(testValue));
```

<a name="autil-isobject"></a>
## #isObject()
should return false if value is falsy.

```js
const $A = Mock$A(),
    testValue = null;
assert.deepEqual(false, $A.util.isObject(testValue));
```

should return true if value is an empty object.

```js
const $A = Mock$A(),
    testValue = {};
assert.ok($A.util.isObject(testValue));
```

should return false if value is an array.

```js
const $A = Mock$A(),
    testValue = [];
assert.deepEqual(false, $A.util.isObject(testValue));
```

should return false if value is a function.

```js
const $A = Mock$A(),
    testValue = function () {
    };
assert.deepEqual(false, $A.util.isObject(testValue));
```

should return false if value is a string.

```js
const $A = Mock$A(),
    testValue = "test string";
assert.deepEqual(false, $A.util.isObject(testValue));
```

should return false if value is a number.

```js
const $A = Mock$A(),
    testValue = 8;
assert.deepEqual(false, $A.util.isObject(testValue));
```

<a name="app"></a>
# App
<a name="app-events"></a>
## events
should be able to register events and handle them using $A.get().

```js
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
```

should not be able to fire events that have not been registered.

```js
const app = MockApp(),
    $A = Mock$A(app),
    testEvent = $A.get('e.c:testEvent');
assert.deepEqual(null, testEvent);
```

should not be able to fire events if there is no app created.

```js
const $A = Mock$A(),
    testEvent = $A.get('e.c:testEvent');
assert.deepEqual(null, testEvent);
```

should be able to pass parameters into events.

```js
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
```

<a name="error-handling"></a>
# Error Handling
should display which attribute is missing.

```js
const component = MockComponent({
    attributes: []
});
try {
    component.get('v.testAttribute');
}
catch (e) {
    assert.deepEqual('attribute "testAttribute" is not defined', e.message);
}
```

should display which element is missing.

```js
const component = MockComponent({
    elements: []
});
try {
    component.find('testElement');
}
catch (e) {
    assert.deepEqual('element "testElement" is not defined', e.message);
}
```

should display which event is not registered.

```js
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
```

should display which apex controller method does not exist.

```js
const component = MockComponent({
    apexController: {}
});
try {
    component.get('c.testMethod');
}
catch (e) {
    assert.deepEqual('action "testMethod" is not defined', e.message);
}
```

should display which controller event handler does not exist.

```js
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
```

