/* global Raygun */
import Ember from 'ember';

export default {
	name: 'logging',

	initialize: function(container, application) {
		// Capture Exceptions and log them to Raygun
		Raygun.init('G5oRCMKDmgp63+QZnCHnZA==').attach();

		// Capture ember errors and log them to Raygun
		Ember.onerror = function(error) {
			Raygun.send(error);
		};
	}
};