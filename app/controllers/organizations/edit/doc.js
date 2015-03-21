import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'organizations/edit',
    breadCrumb: "Documents",
    
    clear: function() {
		this.setProperties({

		});
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			org.set('lastUpdateDate', new Date());
			org.save();
			
			var gallery = this.get('model');
			gallery.set('lastUpdateDate', new Date());
			gallery.save();
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Documents saved??.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.income');
		}
	}
});