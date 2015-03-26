import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: 'dashboard',
    successMsg: null,
    errorMsg: null,
    
    isUserAdmin: function() {
        var user = this.get('controllers.dashboard.model');
	    return user.get('isUserAdmin');
	}.property('controllers.dashboard.model')
});
