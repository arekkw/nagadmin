import Ember from 'ember';

export default Ember.ArrayController.extend({
    zoom: 8,
    centerLat: -30.14068,
    centerLng: 30.136454,
    allmarkers: [],
	
	init: function() {
	    this._super();
		window.map = this;
		this._markers(); //render pins each time view is re-inited
	},

    _markers: function() {
        var self = this;
        this.get('model').forEach(function(org, i) {
            //limit results
            if(i > 50){
                return;
            }
            org.get('profile').then(function(profile) {
                profile.get('address').then(function(address) {
                    var lat = address.get('lat');
                    var lng = address.get('lng');
                    if (lat && lng) {
                        var marker = {
                            id: org.get('id'),
                            title: profile.get('orgName'),
                            lat: lat,
                            lng: lng,
                            isDraggable: false
                        }
                        var markers = self.get('allmarkers').toArray();
                        markers.push(marker);
                        self.set('allmarkers', Ember.A(markers));
                    }
                });
            });
        });
    }.observes('model.@each.org.profile.address')
});
