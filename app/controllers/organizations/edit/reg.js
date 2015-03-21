import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'organizations/edit',
    breadCrumb: "Registrations",
    
    clear: function() {
		this.setProperties({

		});
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			org.set('lastUpdateDate', new Date());
			org.save();
			
			var reg = this.get('model');
			reg.set('lastUpdateDate', new Date());
			reg.save();
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Registrations saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.doc');
		}
	}
});