import Ember from 'ember';

export default Ember.Controller.extend({
	zoom: 8,
	centerLat: -30.14068,
	centerLng: 30.136454,

	markers: function() {
		return this.get('model').filter(function(org, index) {
			return index <= 50;
		}).filter(function(org) {
			return org.get('profile.address.lat') && org.get('profile.address.lng');
		}).map(function(org) {
			return {
				id: org.get('id'),
				title: org.get('profile.orgName'),
				lat: org.get('profile.address.lat'),
				lng: org.get('profile.address.lng'),
				isDraggable: false
			};
		}, this);
	}.property('model.@each.org.profile.address')
});
