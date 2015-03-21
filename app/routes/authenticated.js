import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.authentication.get('isAuthenticated')) {
			this.transitionTo('security.login');
		}
		this._super();
	}
});