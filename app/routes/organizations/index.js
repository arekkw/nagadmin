import Ember from 'ember';
import Authenticated from 'nag-admin/routes/authenticated';

export default Authenticated.extend({
	model: function() {
		return Ember.RSVP.hash({
			organizations: this.store.findAll('organizations/org'),
			profiles: this.store.findAll('organizations/profile'),
			addresses: this.store.findAll('address'),
			orgTypes: this.store.find('ref/orgtype')
		});
	},

	setupController: function(controller, model) {
		model.filterAddress = this.store.getById('address', 'filterAddress') || this.store.createRecord('address', {
			id: 'filterAddress'
		});

		this._super(controller, model);
	}
});