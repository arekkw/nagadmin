import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		this.$().parents('body').addClass('login-layout');
	}.on('didInsertElement'),
	
	willDestroyElement: function() {
		this.$().parents('body').removeClass('login-layout');
	}.on('willDestroyElement'),
	
	currentYear: function(){
		return new Date().getFullYear();
	}.property()
});
