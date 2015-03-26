import Ember from 'ember';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

export default Ember.Controller.extend({
	needs: ['dashboard'],
	breadCrumb: "Add User",
	selectedRoles: [],
	roles: [],
	
	clear: function() {
		this.setProperties({
			selectedRoles: [],
			newUserEmail: null
		});
	},

	isUserAdmin: function() {
		var user = this.get('controllers.dashboard.model');
		return user.isUserAdmin();
	}.property(),

	actions: {
		createUser: function() {
			var email = this.get('newUserEmail');
			var scrubbedEmail = fbEmailKeyScrubber(email);
			var user = this.store.createRecord('sec/user', {
				id: scrubbedEmail,
				email: email,
				firstName: null,
				lastName: null,
				avatar: null,
				lastLoginDate: null,
				authStore: null
			});
			user.replaceRoleRelations(this.get('selectedRoles'));
			user.save();
			this.transitionToRoute('users');
		}
	}
});
