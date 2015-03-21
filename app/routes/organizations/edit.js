import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('organizations/org', params.org_id);
    },
    afterModel: function(org) {
        if(org.get('isNew')) {
            this.transitionTo('organizations.edit.profile', org);
        }
    }
});
