import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        delete: function() {
            var user = this.get('model');
            user.destroyRecord();
        }
    }
});
