import Ember from 'ember';

export default Ember.View.extend({
    initialize: function() {
		Ember.$('#establishedDate-date-picker').datepicker({
			autoclose: true,
			format: "yyyy",
			endDate: "y",
			orientation: "bottom left",
			startView: 2,
			minViewMode: 2
		});

	}.on('didInsertElement')
});