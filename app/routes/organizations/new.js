import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('organizations/org');
    },
    afterModel: function(org) {
        //set org as the model for edit
        this.transitionTo('organizations.edit', org);
    }
});
