import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'organizations/edit',
    breadCrumb: "Infrastructure",
    
    clear: function() {
		this.setProperties({

		});
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			org.set('lastUpdateDate', new Date());
			org.save();
			
			var infra = this.get('model');
			infra.set('lastUpdateDate', new Date());
			infra.save();
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Infrastructure saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.prog');
		}
	}
});