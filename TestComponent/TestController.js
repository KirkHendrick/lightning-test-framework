/**
 * Created by khendrick on 9/14/16.
 */
({
	testGet: function (component) {
		// test comment
		var testAttribute = component.get('v.testAttribute');
	},

	testSet: function (component) {
		/*
		test block comment
		 */
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
	},

	testEventHandled: function (component) {
		component.set('v.eventHandled', true);
	},

	testSecondEventHandled: function (component) {
		component.set('v.secondEventHandled', true);
	},

	testEventParams: function (component, event) {
		component.set('v.testParam', event.getParam('testParam'));
	},
})

