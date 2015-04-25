import OrgEditBaseRoute from './base';

export default OrgEditBaseRoute.extend({
    model: function() {
        return this._model('profile');
    },

    setupController: function(controller, model) {
        controller.clear();
        controller.set('accessToken', this.authentication.get('google.accessToken'));
        controller.set('profilePicsDir', 'orgs/profilePics/' + model.get('id'));
        controller.set('galleryPicsDir', 'orgs/galleryPics/' + model.get('id'));
        this.store.find('ref/orgtype').then(function(orgTypes) {
            controller.set('orgTypes', orgTypes);
        });
        this.store.find('ref/orgstatus').then(function(orgTypes) {
            controller.set('orgStatuses', orgTypes);
        });
        this.store.find('ref/contacttype').then(function(contactTypes) {
            controller.set('contactTypes', contactTypes);
        });
        this.store.find('ref/daysOfWeek').then(function(daysOfWeek) {
            controller.set('daysOfWeek', daysOfWeek);
        });

        var self = this;
        model.get('contact').then(function(contact) {
            if (!contact) {
                var _contact = self.store.createRecord('contact');
                model.set('contact', _contact);
            }
        });
        
        model.get('address').then(function(address) {
            if (!address) {
                var _address = self.store.createRecord('address');
                model.set('address', _address);
            }
        });
        
        controller.set('model', model);
    }
});