import Ember from 'ember';

export default Ember.Controller.extend({
	needs: 'dashboard',
    
    isOrgAdmin: function() {
        var user = this.get('controllers.dashboard.model');
        return user?user.get('isOrgAdmin'):false;
	}.property('controllers.dashboard.model')
});
