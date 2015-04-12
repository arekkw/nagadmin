/* global Raygun */
import Ember from 'ember'; 

export default {
	name: 'logging',
	after: 'authentication',

	initialize: function(container) {
		// Capture Exceptions and log them to Raygun
		Raygun.init('G5oRCMKDmgp63+QZnCHnZA==').attach();

		// Capture ember errors and log them to Raygun
		Ember.onerror = function(error) {
			Raygun.send(error);
		};

		// Set the current user after login for Raygun errors
		var firebase = container.lookup('firebase:connection');
		firebase.onAuth(function(authentication) {
			if (authentication && authentication.google) {
				Raygun.setUser(authentication.google.email);
			}
		});
	}
};