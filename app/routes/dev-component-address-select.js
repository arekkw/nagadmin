import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model){
        var address = this.store.createRecord('address');
        model.set("address1", address);
        
        var address2 = this.store.createRecord('address');
        model.set("address2", address2);
        
        controller.set('model', model);
    }
});
