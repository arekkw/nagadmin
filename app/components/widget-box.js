import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['widget-box'],
	
	didInsertElement: function() {
		this.$().on('shown.ace.widget', function() {
			this.trigger('show');
		}.bind(this));

		this.$().widget_box('show');
	},

	willDestroyElement: function() {
		this.$().widget_box('hide');
	},

	onShow: function() {
		this.$().find('input:first').focus();
	}
});