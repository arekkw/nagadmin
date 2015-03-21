import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'admin/users',
    actions: {
        save: function(){
            var user = this.get('model');
            user.save();
            this.set('controllers.admin/users.successMsg', 'User saved successfully.');
        }
    },
    
    init: function() {
        var self = this;
        this.store.findAll('sec/role').then(function(roles){
            self.set('roles', roles);
        });
    }
});
