var Mock$A = require('../Mock$A').Mock$A,Helper = (function($A) { 'use strict'; var publicApi = {	testGet: function (component) {		return component.get('v.testAttribute');	},	test$AisUndefined: function (obj) {		$A.util.isUndefined(obj);	},	testScript: function () {		return true;	},	setParam: function (component, param) {		component.set('v.testParam', param);	}}; return publicApi; })(Mock$A()); exports.Helper = Helper; 