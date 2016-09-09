/**
 * Created by khendrick on 9/3/16.
 */

(function MockComponent(exports) {

    'use strict';

    var attributes = [];

    var MockComponent = function(attributes) {
        return new MockComponent.init(attributes);
    };


    MockComponent.prototype = {
        get : function(attributeName) {
            var attribute = this.attributes.filter(function(obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            return attribute;
        },

        set : function(attributeName, newValue) {
            var attribute = this.attributes.filter(function(obj) {
                return obj.name === attributeName.slice(2);
            })[0];

            attribute.value = newValue;
        }
    };

    MockComponent.init = function(attributes) {

        this.attributes = attributes || [];

    };

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

