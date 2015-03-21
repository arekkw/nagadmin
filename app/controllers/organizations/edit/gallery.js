import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
    needs: ['organizations/edit'],
    breadCrumb: "Gallery",
    galleryLog: [],
    uploadsComplete: false,
    
    clear: function() {
		this.setProperties({
			galleryLog: [],
			uploadsComplete: false
		});
	},
	
	_galleryLog: function(){
		var logs = this.get('galleryLog');
		var gallery = this.get('model');
		// refresh the 
		Ember.$('#refreshGallery').click();
	}.observes('uploadsComplete'),
	
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
			this.set('controllers.organizations/edit.successMsg', 'Gallery saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.gallery');
		}
	}
});