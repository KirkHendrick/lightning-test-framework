/**
 * Created by khendrick on 9/14/16.
 */

({
	testGet: function (component) {
		return component.get('v.testAttribute');
	},

	test$AisUndefined: function (obj) {
		$A.util.isUndefined(obj);
	},

	testScript: function () {
		return true;
	},

	setParam: function (component, param) {
		component.set('v.testParam', param);
	},

	testSuper: function (component, helper) {
		return helper.testGetSuper(component);
	}
})