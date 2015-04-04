import Ember from 'ember';

export default Ember.ArrayController.extend({
    zoom: 7,
    centerLat: -29.890662,
    centerLng: 30.978012,
    allmarkers: [],
    
    initMap: function() {
		console.log("didInsertElement map");
	}.on('didInsertElement'),

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
                            title: profile.get('orgName'),
                            lat: lat,
                            lng: lng,
                            isDraggable: true
                        }
                        var markers = self.get('allmarkers').toArray();
                        markers.push(marker);
                        self.set('allmarkers', Ember.A(markers));
                    }
                });
            });
        });
    }.observes('model.@each.org.profile.address'),
    
    _test1: function(s) {
        console.log("_test1 " + s);
    }.observes('model.@each'),
    
    _test2: function(s) {
        console.log("_test2 " + s);
    }.observes('model.@each.profile'),
    
    _test3: function(s) {
        console.log("_test3 " + s);
    }.observes('model.@each.profile.address'),
    
    _test4: function(s) {
        console.log("_test4 " + s);
    }.observes('model.@each.profile.address.lat'),
    
    _test5: function(s) {
        console.log("_test5 " + s);
    }.observes('model')
});
