import Ember from 'ember';

export default Ember.Controller.extend({
	needs: 'dashboard',
    
    isOrgAdmin: Ember.computed.bool('controllers.dashboard.model.isOrgAdmin'),
    
    initorg: function() {
		console.log("didInsertElement org");
	}.on('didInsertElement'),
});
