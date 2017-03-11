(function (exports) {

    'use strict';

    const MockComponent = function (attributes, elements, registeredEvents,
                                  eventHandlers, apexController, controller,
                                  helper, extendsFrom) {
        if (attributes === undefined) {
            return new MockComponent.init();
        }
        else {
            if (!Array.isArray(attributes)) {
                const options = attributes;
                attributes = options.attributes || [];
                elements = options.elements || [];
                registeredEvents = options.registeredEvents || [];
                eventHandlers = options.eventHandlers || [];
                apexController = options.apexController || {};
                controller = options.controller || {};
                helper = options.helper || {};
                extendsFrom = options.extendsFrom || [];
            }

            return new MockComponent.init(attributes, elements, registeredEvents,
                eventHandlers, apexController, controller,
                helper, extendsFrom);
        }
    };

    MockComponent.prototype = {
        get: function (input) {
            const self = this;

            if (input[0] === 'c') {
                return getControllerAction(input);
            }
            else if (input[0] === 'v') {
                return getAttribute(input);
            }

            function getControllerAction(input) {
                let action = self.getReference(input);

                try {
                    action.setParams = function (params) {
                        action.params = Object.keys(params)
                            .map(function (param) {
                                if (params.hasOwnProperty(param)) {
                                    return params[param];
                                }
                            });
                    };

                    action.setCallback = function (context, callback) {
                        action.callback = callback;
                    };
                }
                catch (e) {
                    throw new ReferenceError(
                        'action "' + input.slice(2) + '" is not defined'
                    );
                }

                return action;
            }

            function getAttribute(input) {
                try {
                    let attributeName = input.slice(2),
                        path = [attributeName];

                    if (attributeName.indexOf('.') !== -1) {
                        path = attributeName.split('.');
                    }

                    let attribute = self.attributes.find(function (obj) {
                        return obj.name === path[0] || attributeName;
                    });

                    return getFromPath(attribute.value, path.slice(1));
                }
                catch (e) {
                    throw new ReferenceError('attribute "' + input.slice(2) + '" is not defined');
                }
            }

            function getFromPath(obj, path) {
                if (obj[path[0]] === undefined) {
                    return obj;
                }
                else {
                    return getFromPath(obj[path[0]], path.slice(1));
                }
            }
        },

        set: function (attributeName, newValue) {
            this.attributes.find(function (obj) {
                return obj.name === attributeName.slice(2);
            }).value = newValue;
        },

        find: function (auraId) {
            const element = this.elements.find(function (obj) {
                return obj.auraId === auraId;
            });

            if (element === undefined) {
                throw new ReferenceError(
                    'element "' + auraId + '" is not defined'
                );
            }

            return element;
        },

        getEvent: function (eventName) {
            const event = this.registeredEvents.find(function (obj) {
                return obj.name === eventName;
            });

            if (event === undefined) {
                throw new ReferenceError(
                    'event "' + eventName + '" is not registered'
                );
            }

            return event;
        },

        getReference: function (actionName) {
            return this.apexController[actionName.slice(2)];
        },

        isValid: function () {
            return true;
        }
    };

    MockComponent.init = function (attributes, elements, registeredEvents,
                                   eventHandlers, apexController,
                                   controller, helper, extendsFrom) {
        this.attributes = attributes || [];
        this.elements = elements || [];
        this.registeredEvents = registeredEvents || [];
        this.eventHandlers = eventHandlers || [];
        this.apexController = apexController || {};
        this.controller = controller || {};
        this.helper = helper || {};
        this.extendsFrom = extendsFrom || [];

        associateEventHandlers.call(this);

        extendComponents.call(this);
    };

    function associateEventHandlers() {
        const self = this;
        self.registeredEvents.forEach(function (registeredEvent) {
            const associatedHandlers = self.eventHandlers.filter(function (handler) {
                return handler.name === registeredEvent.name;
            });

            registeredEvent.setParams = function (params) {
                registeredEvent.params = params;
                return registeredEvent;
            };

            registeredEvent.fire = function () {
                associatedHandlers.forEach(function (handler) {
                    try {
                        self.controller[handler.action.slice(2)](self, {
                                getParam: function (param) {
                                    return registeredEvent.params[param];
                                },
                                stopPropagation: function () {
                                }
                            },
                            self.helper);
                    }
                    catch (e) {
                        throw new ReferenceError(
                            'controller method "' + handler.action.slice(2) + '" does not exist'
                        );
                    }
                });
            };
        });
    }

    function extendComponents() {
        const self = this;

        self.extendsFrom.forEach(function (component) {
            component.attributes.forEach(function (attribute) {
                self.attributes.push(attribute);
            });
            Object.setPrototypeOf(self.helper, component.helper);
        });
    }

    MockComponent.init.prototype = MockComponent.prototype;

    exports.MockComponent = MockComponent;

})(this);
