Lightning Test Framework
=====================

The Lightning Test Framework (LTF) provides the ability to unit test Lightning Components, outside of the browser and the Salesforce environment.

A template to get started using it can be found [here.](https://github.com/KirkHendrick/ltf-example)

## Examples
### Mock Components

The LTF provides utility functions to create a mock version of the component under test.

We can then use component methods just as we do within the Aura framework.

```javascript
const component = MockComponent({
    attributes: [
        {
            name: 'foo',
            value: 'bar'
        }
    ]
});
 
let foo = component.get('v.foo');
 
foo;    // bar
 
component.set('v.foo', 'baz');
 
foo = component.get('v.foo');
 
foo;    // baz
```

We can use this to unit test components using any NodeJS-based Javascript testing suite.

```javascript
// Mocha
const assert = require('assert'),
    TestComponentHelper = require('build/TestComponentHelper').Helper;
 
describe('TestComponent', function () {
    describe('Helper', function () {
        describe('#foo()', function () {
            it('should set the "foo" attribute to "bar"', function () {
                const helper = TestComponentHelper,
                    component = MockComponent({
                        attributes: [
                            {
                                name: 'foo' 
                            }
                        ] 
                    });
                    
                helper.foo(component, helper);
                
                assert.deepEqual('bar', component.get('v.foo'));
            });
        });
    });
});

```
[See the test spec for more examples](https://github.com/KirkHendrick/lightning-test-framework/blob/dev/spec.md)

## Setup

 1. Initialize a new npm project.
 2. Clone this repository within it.
 3. Set up your testing suite.
 4. Configure settings using settings.json:
     5. Specify the location of your aura directory.
     6. Specify which components you wish to test.
 7. Run "gulp convert" to build the Javascript files.
 8. Reference these files within your tests.

Related Resources
--------
[Lightning Components Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_overview.htm)
[Mocha Documentation](https://mochajs.org/)

[Mocha Documentation](https://mochajs.org/)

