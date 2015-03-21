import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
    needs: ['organizations/edit'],
    breadCrumb: "Profile",
    uploadedLog: [],
    contactUploadedLog: [],
    
    clear: function() {
		this.setProperties({
			uploadedLog: [],
			contactUploadedLog: []
		});
	},
	
	_uploadedLog: function(){
		var logs = this.get('uploadedLog');
		var profile = this.get('model');
		if(profile && logs.length > 0){
			profile.set('img_url', logs.get(0));
			this.set('uploadedLog', []);
		}
	}.observes('uploadedLog.[]'),
	
	_orgProfilePicUrl: function(){
		var url = this.get('model.img_url');
		if(!url) {
			this.set('showOrgUploadComp', true);
			return false;
		}
		var accessToken = this.get('accessToken');
		this.set('showOrgUploadComp', false);
		this.set('orgProfilePicUrl', url + '&access_token=' + accessToken);
	}.observes('model.img_url','accessToken'),
	
	_contactUploadedLog: function(){
		var logs = this.get('contactUploadedLog');
		var profile = this.get('model');
		if(profile && logs.length > 0){
			profile.set('contact.img_url', logs.get(0));
			this.set('contactUploadedLog', []);
		}
	}.observes('contactUploadedLog.[]'),
	
	_contactPicUrl: function(){
		var url = this.get('model.contact.img_url');
		if(!url) {
			this.set('showContactUploadComp', true);
			return false;
		}
		var accessToken = this.get('accessToken');
		this.set('showContactUploadComp', false);
		this.set('contactPicUrl', url + '&access_token=' + accessToken);
	}.observes('model.contact.img_url','accessToken'),
	
	_persist: function(someModel, checkDirty) {
		if(checkDirty){
			if(!someModel.get('isDirty') && !someModel.get('isNew')){
				return;
			}
		} 
		someModel.set('lastUpdateDate', new Date());
		someModel.save();
	},
	
    actions: {
		_save: function() {
			var org = this.get('controllers.organizations/edit.model');
			this._persist(org);
			
			var profile = this.get('model');
			this._persist(profile);
			
			var contact = profile.get('contact.content');
			this._persist(contact, false);//relationships dont trigger dirty flag!
			
			var address = profile.get('address.content');
			this._persist(address, false);
		},
		save: function() {
			this.send('_save');
			this.set('controllers.organizations/edit.successMsg', 'Profile saved.');
		},
		saveNext: function() {
			this.send('_save');
			this.transitionToRoute('organizations.edit.reg');
		},
		editProfilePic: function() {
			this.set('uploadedLog', []);
			this.set('showOrgUploadComp', true);
		},
		editContactPic: function() {
			this.set('contactUploadedLog', []);
			this.set('showContactUploadComp', true);
		}
	}
});