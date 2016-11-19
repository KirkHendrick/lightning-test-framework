/**
 * Created by khendrick on 9/14/16.
 */

({
	testGetSuper: function (component) {
		return component.get('v.testSuperAttribute');
	},

	setSetSuper: function (component, param) {
		component.set('v.testSuperAttribute', param);
	}
})
