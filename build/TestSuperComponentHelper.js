var Mock$A = require('../Mock$A').Mock$A,Helper = (function($A) { 'use strict'; var publicApi = {	testGetSuper: function (component) {		return component.get('v.testSuperAttribute');	},	setSetSuper: function (component, param) {		component.set('v.testSuperAttribute', param);	}}; return publicApi; })(Mock$A()); exports.Helper = Helper; 