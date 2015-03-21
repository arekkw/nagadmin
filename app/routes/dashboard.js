import Authenticated from 'nag-admin/routes/authenticated';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

export default Authenticated.extend({
    model: function() {
		if (this.get('authentication.isAuthenticated')) {
			//email address identifies user. So we need to look up email by provider and scrub it.
			var provider = this.get('authentication.auth.provider');
			var email = this.get('authentication.'+provider+'.email');
			return this.store.find('sec/user', fbEmailKeyScrubber(email));
		} else {
			console.log('not authenticated');
			return null;
		}
	}
});
