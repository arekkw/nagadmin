import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		logout: function() {
			this.firebase.unauth();
		},
		showModal: function(name, model) {
			this.render(name, {
				into: 'application',
				outlet: 'modal',
				model: model
			});
		},
		removeModal: function() {
			this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		},
   		error: function(error, transition) {
   			console.error(error);
   			console.log(transition);
      		this.transitionTo('/dashboard/error');
    	}
	}
});