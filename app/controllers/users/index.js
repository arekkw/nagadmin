import Ember from 'ember';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

export default Ember.ArrayController.extend({
    needs: 'dashboard',
    successMsg: null,
    errorMsg: null,
    
    idToEmail: function() {
      return fbEmailKeyScrubber(this.get('id'));
    },
    
    isUserAdmin: function() {
        var user = this.get('controllers.dashboard.model');
	    return user.get('isUserAdmin');
	}.property('controllers.dashboard.model'),
	
	
});
