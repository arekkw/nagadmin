import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'admin/users',
    actions: {
        delete: function() {
            var user = this.get('model');
            user.destroyRecord();
            this.set('controllers.admin/users.successMsg', 'User deleted successfully.');
        }
    }
});
