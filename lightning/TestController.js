/**
 * Created by khendrick on 9/14/16.
 */
({
    testGet: function (component) {
        var testAttribute = component.get('v.testAttribute');
    },

    testSet: function (component) {
        component.set('v.testAttribute', 'newValue');
    },

    testFind: function (component) {
        var testElement = component.find('testElement');
    },

    testHelperGet: function (component, event, helper) {
        helper.testGet(component);
    },

    test$AisUndefined: function (obj) {
        $A.util.isUndefined(obj);
    },

    testScript: function () {
    	return true;
	}
})

