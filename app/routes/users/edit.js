import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		if (params.id === 'new') {
			return this.store.createRecord('sec/user');
		} else {
			return this.store.find('sec/user', params.id);
		}
	},

	setupController: function(controller, model) {
		this.store.findAll('sec/role').then(function(roles){
			controller.set('roles', roles);
		});

		if (model.get('isNew')) {
			controller.set('breadCrumb', 'New');
		} else {
			controller.set('breadCrumb', 'Edit');
		}

		return this._super(controller, model);
	}
});
