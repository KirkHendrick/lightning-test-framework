Lightning Test Framework
=====================

This package allows you to unit test javascript in the Salesforce Lightning Components framework.

Setup
--------

 1. Clone this repository.
 2. Create a new npm project.
     3. 
     4. 
     5. 
 6. 

Usage
--------
```
const assert = require('assert'),
      ltf = require('lightning-test-framework');
 
const component = ltf.MockComponent({
    attributes: [{
         name: 'foo',
         value: 'bar'
    }]
});
 
const foo = component.get('v.foo');
 
assert.deepEqual('bar', foo);
```
```
const assert = require('assert'),
      ltf = require('lightning-test-framework');
 
const component = ltf.MockComponent({
    elements: [{
         auraId: 'foo',
         cssClasses: 'slds-hide'
    }]
});
const $A = ltf.Mock$A();
 
const foo = component.find('foo');
 
const result = $A.util.hasClass(foo, 'slds-hide');
 
assert.ok(result);
```
```
const assert = require('assert'),
      ltf = require('lightning-test-framework');
 
const component = ltf.MockComponent({
    registeredEvents: [{
         name: 'testEvent'
    }],
    eventHandlers: [{
         name: 'testEvent',
         action: 'c.testEventHandled' 
    }]
});
 
const testEvent = component.getEvent('testEvent');

testEvent.fire();
 
```

Related Resources
--------
[Lightning Components Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_overview.htm)

