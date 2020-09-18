// eslint-disable-next-line no-unused-expressions
({
    reInit: function (component, event, helper) {
        $A.get('e.force:refreshView').fire();
    }
})