import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'organizations/edit',
    breadCrumb: "Programme",
    
    clear: function() {
		this.setProperties({

		});
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			org.set('lastUpdateDate', new Date());
			org.save();
			
			var prog = this.get('model');
			prog.set('lastUpdateDate', new Date());
			prog.save();
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Programme saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.gallery');
		}
	}
});