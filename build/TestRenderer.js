var Mock$A = require('../Mock$A').Mock$A,Renderer = (function($A) { 'use strict'; var publicApi = {    afterRender: function (component) {        this.superAfterRender();        component.set('v.testAttribute', true);    },    rerender: function (component) {        this.superRerender();        component.set('v.testAttribute', true);    },    unrender: function (component) {        this.superUnrender();        component.set('v.testAttribute', true);    },    render : function(component) {        var ret = this.superRender();        component.set('v.testAttribute', true);        return ret;    },};publicApi.superAfterRender = function(){};publicApi.superRerender = function(){};publicApi.superUnrender = function(){};publicApi.superRender = function(){}; return publicApi; })(Mock$A()); exports.Renderer = Renderer; 