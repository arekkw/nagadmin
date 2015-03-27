import Ember from 'ember';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

export default Ember.Controller.extend({
	actions: {
		cancel: function() {
			this.transitionToRoute('users');
		},

		save: function() {
			this.set('error', undefined);

			var model = this.get('model');
			var email = fbEmailKeyScrubber(model.get('email'));

			if (model.get('isNew')) {
				model.set('id', email);
			}

			if (model.get('isNew') && this.store.hasRecordForId('sec/user', model.get('id'))) {
				this.set('error', 'User "' + model.get('id') + '" already exists.');
			} else {
				model.replaceRoleRelations(this.get('model.roles'));
				model.save();

				this.transitionToRoute('users');
			}
		}
	}
});
