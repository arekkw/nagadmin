/* global ace */
import Ember from 'ember';
import EnvironmentMixin from 'nag-admin/mixins/environment';

export default Ember.View.extend(EnvironmentMixin, {
	initializeAce: function() {
		Ember.$.ready();

		// Restore user preferences
		ace.settings.check('navbar', 'fixed');
		ace.settings.check('main-container', 'fixed');
		ace.settings.check('sidebar', 'fixed');
		ace.settings.check('sidebar', 'collapsed');
		ace.settings.check('breadcrumbs', 'fixed');
		
		var $sidebar = this.$('.sidebar');
		$sidebar.ace_sidebar();
		this.$('#menu-toggler').click(function(){
			$sidebar.toggleClass('display');
		});
		
		//anytime an ember view in the sidebar is selected, close the menu
		$sidebar.find('.ember-view').click(function(){
			setTimeout(function() {
				$sidebar.removeClass('display');
			}, 700);
		});
		
	}.on('didInsertElement'),
	
	currentYear: function(){
		return new Date().getFullYear();
	}.property()
});