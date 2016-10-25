({
    afterRender: function (component) {
        this.superAfterRender();

        component.set('v.testAttribute', true);
    },

    rerender: function (component) {
        this.superRerender();

        component.set('v.testAttribute', true);
    },

    unrender: function (component) {
        this.superUnrender();

        component.set('v.testAttribute', true);
    },

    render : function(component) {
        var ret = this.superRender();

        component.set('v.testAttribute', true);

        return ret;
    },
})
