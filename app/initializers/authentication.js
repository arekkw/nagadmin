/* global Firebase */
import Ember from 'ember';
import config from '../config/environment';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

var Authentication = Ember.ObjectProxy.extend({
	isAuthenticated: function() {
		var uid = this.get('uid');
		return !Ember.isBlank(uid);
	}.property('uid')
});

export default {
	name: 'authentication',
	after: 'store',
	initialize: function(container, application) {
		var authentication = Authentication.create();
		var firebase = new Firebase(config.firebaseUrl);

		// Check the initial authentication status
		authentication.set('content', firebase.getAuth());
		
		// Listen for authentication changes
		firebase.onAuth(function(firebaseAuthentication) {
			if (firebaseAuthentication !== authentication.get('content')) {
				authentication.set('content', firebaseAuthentication);
				if(firebaseAuthentication && firebaseAuthentication.google){
					container.lookup('controller:security/login').authenticateGoogle(null, firebaseAuthentication);
					var scrubbedEmail = fbEmailKeyScrubber(firebaseAuthentication.google.email);
					container.lookup('store:main').find('sec/user', scrubbedEmail).then( function(user) {
				        // Register the `user:current` namespace
				        container.register('user:current', user, {instantiate: false, singleton: true});
				    });
				} else {
					container.lookup('route:application').refresh();
				}
			}
		});

		// Configure the firebase object for dependency injection
		application.register('firebase:connection', firebase, { instantiate: false, singleton: true });
		application.inject('adapter', 'firebase', 'firebase:connection');
		application.inject('controller:security.login', 'firebase', 'firebase:connection');
		application.inject('controller:security.forgotPassword', 'firebase', 'firebase:connection');
		application.inject('route:application', 'firebase', 'firebase:connection');

		// Configure the authentication details for dependency injection
		application.register('firebase:authentication', authentication, { instantiate: false, singleton: true });
		application.inject('route', 'authentication', 'firebase:authentication');
		application.inject('controller', 'authentication', 'firebase:authentication');
	}
};