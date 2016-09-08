/**
 * Created by khendrick on 9/3/16.
 */

(function MockComponent(exports) {

    'use strict';

    var attributes = [];

    var MockComponent = function(attributes) {
        return new MockComponent.init(attributes);
    };


    MockComponent.prototype = {};

    MockComponent.init = function(attributes) {

        this.attributes = attributes || 'test attribute';

    };

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);

