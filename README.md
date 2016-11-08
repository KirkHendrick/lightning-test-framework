Lightning Test Framework
=====================

### Unit test Lightning Components Javascript, outside of Salesforce

Setup
--------

 1. Clone this repository.
 2. Create a new npm project.
     3. 
     4. 
     5. 
 6. 

Examples
--------
```javascript
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
```javascript
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
```javascript
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

