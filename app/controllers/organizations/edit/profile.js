import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
	needs: ['organizations/edit'],
	breadCrumb: "Profile",

	clear: function() {
		this.setProperties({
			uploadedLog: [],
			contactUploadedLog: [],
			marker: [],
			zoom: 8,
			centerLat: -29.890662,
			centerLng: 30.978012
		});
	}.observes('model.id'),

	_marker: function() {
		var self = this;
		this.get('model.address').then(function(address) {
			var lat = address.get('lat');
			var lng = address.get('lng');

			if (lat && lng) {
				self.set('zoom', 16);
				self.set('centerLat', lat);
				self.set('centerLng', lng);
				var marker = {
					title: self.get('model.orgName'),
					lat: lat,
					lng: lng,
					isDraggable: true
				};
				self.set('marker', Ember.A([marker]));
			}
		});
	}.observes('model.address.lat', 'model.address.lng'),

	_uploadedLog: function() {
		var logs = this.get('uploadedLog');
		var profile = this.get('model');
		if (profile && logs.length > 0) {
			profile.set('img_url', logs.get(0));
			this.set('uploadedLog', []);
		}
	}.observes('uploadedLog.[]'),

	_orgProfilePicUrl: function() {
		var url = this.get('model.img_url');
		if (!url) {
			this.set('showOrgUploadComp', true);
			return false;
		}
		var accessToken = this.get('accessToken');
		this.set('showOrgUploadComp', false);
		this.set('orgProfilePicUrl', url + '&access_token=' + accessToken);
	}.observes('model.img_url', 'accessToken'),

	_contactUploadedLog: function() {
		var logs = this.get('contactUploadedLog');
		var profile = this.get('model');
		if (profile && logs.length > 0) {
			profile.set('contact.img_url', logs.get(0));
			this.set('contactUploadedLog', []);
		}
	}.observes('contactUploadedLog.[]'),

	_contactPicUrl: function() {
		var url = this.get('model.contact.img_url');
		if (!url) {
			this.set('showContactUploadComp', true);
			return false;
		}
		var accessToken = this.get('accessToken');
		this.set('showContactUploadComp', false);
		this.set('contactPicUrl', url + '&access_token=' + accessToken);
	}.observes('model.contact.img_url', 'accessToken'),

	_persist: function(someModel, checkDirty) {
		if (checkDirty) {
			if (!someModel.get('isDirty') && !someModel.get('isNew')) {
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
			this._persist(contact, false); //relationships dont trigger dirty flag!

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
		},
		checkAddress: function() {
			var self = this;
			var saContext = ", South Africa";
			var physicalAddress = this.get('model.address.physicalAddress');
			if(physicalAddress && physicalAddress.lastIndexOf(saContext) < 0) {
				physicalAddress+=saContext;
			}
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode( { 'address': physicalAddress}, function(results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			    	self.set('model.address.lat', results[0].geometry.location.lat());
					self.set('model.address.lng', results[0].geometry.location.lng());
			    } else {
			      alert('Geocode was not successful for the following reason: ' + status);
			    }
			  });
		},
		moveMarker: function(target) {
			var marker;
			// the ember target is the view, so our marker is the model of the controller for that view
			marker = target.get('controller.model');
			this.set('model.address.lat', marker.lat);
			this.set('model.address.lng', marker.lng);
			
			// stop propagation so that the context menu doesn't show-up
			return false;
		}
	}
});