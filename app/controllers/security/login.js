import Ember from 'ember';
import { fbEmailKeyScrubber } from 'nag-admin/helpers/fb-email-key-scrubber';

export default Ember.Controller.extend({
	remember: false,
	allowRememberMe: false,
	googleAuthScope: "https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile, https://www.googleapis.com/auth/devstorage.read_write",
	
	init: function() {
		this.clear();
	},

	clear: function() {
		this.setProperties({
			email: null,
			password: null,
			hasError: false,
			isProcessing: false,
			errorMessage: ''
		});
	},

	authenticateGoogle: function(error, authData) {
		this.set('isProcessing', false);
		this.set('authData', authData);
		if (error) {
			if (error.code === "TRANSPORT_UNAVAILABLE") {
				// fall-back to browser redirects, and pick up the session
				// automatically when we come back to the origin page
				var rem = this.get('remember') ? 'default' : 'sessionOnly';
				this.firebase.authWithOAuthRedirect("google", this.authenticateGoogle.bind(this), {
					remember: rem,
					scope: this.get('googleAuthScope')
				});
				//stop further processing
				return;
			}
			this.authenticationError(error);
		}
		else {
			this.setProperties({
				hasError: false,
				isProcessing: true,
			});
			var self = this;
			var scrubbedEmail = fbEmailKeyScrubber(authData.google.email);
			this.store.find('sec/user', scrubbedEmail).then(function(user) {
				var authData = self.get('authData');
				user = self.applyUserProfile(
					user,
					authData,
					authData.google.email,
					authData.google.cachedUserProfile.given_name,
					authData.google.cachedUserProfile.family_name,
					authData.google.cachedUserProfile.picture);
				user.save().then(self.saveSuccess.bind(this), self.saveFail.bind(this)); // always save to persist the new tokens
			}, this.authenticationError.bind(this));

			this.clear();
			this.transitionToRoute('index');
		}
	},

	applyUserProfile: function(user, authData, email, firstName, lastName, avatar) {
		user.setProperties({
			email: user.get('email') || email || '',
			firstName: user.get('firstName') || firstName || '',
			lastName: user.get('lastName') || lastName || '',
			avatar: user.get('avatar') || avatar || '',
			authStore: user.get('authStore') || {},
			lastLoginDate: new Date()
		});

		user.set('authStore.' + authData.provider, authData);
		return user;
	},

	authenticationError: function(error) {
		console.error("authenticationError: " + error);
		this.setProperties({
			hasError: true,
			errorMessage: error.message
		});
	},

	saveSuccess: function(user, msg) {
		console.log("Success! Should have saved. " + msg);
	},

	saveFail: function(msg) {
		console.log("Fail! Didnt save. " + msg.errors);
	},

	actions: {
		googleAuth: function() {
			var rem = this.get('remember') ? 'default' : 'sessionOnly';
			this.firebase.authWithOAuthPopup("google", this.authenticateGoogle.bind(this), {
				remember: rem,
				scope: this.get('googleAuthScope')
			});
		}
	}
});
