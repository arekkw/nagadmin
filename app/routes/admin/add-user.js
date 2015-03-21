import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller) {
	    controller.clear(); // reset model
        this.store.findAll('sec/role').then(function(roles){
            controller.set('roles', roles);
        });
    }
});
