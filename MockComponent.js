/**
 * Created by khendrick on 9/3/16.
 */

(function(exports) {

    'use strict';

    var attributes = [];
    var elements = [];

    var MockComponent = function(attributes, elements) {
        return new MockComponent.init(attributes, elements);
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
        },

        find : function(elementName) {
            var element = this.elements.filter(function(obj) {
                return obj.name === elementName;
            })[0];

            return element;
        }
    };

    MockComponent.init = function(attributes, elements) {

        this.attributes = attributes || [];
        this.elements = elements || [];

    };

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

