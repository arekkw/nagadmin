import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'organizations/edit',
    breadCrumb: "Income",
    
    clear: function() {
		this.setProperties({

		});
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			org.set('lastUpdateDate', new Date());
			org.save();
			
			var income = this.get('model');
			income.set('lastUpdateDate', new Date());
			income.save();
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Income saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.infra');
		}
	}
});