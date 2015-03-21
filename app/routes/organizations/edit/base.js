import Ember from 'ember';

export default Ember.Route.extend({
    _model: function(modelType) {
        var self = this;
        return this.modelFor('organizations.edit').get(modelType).then(function(model){
            if(model){
                return model;
            }
            var org = self.modelFor('organizations.edit');
            model = self.store.createRecord('organizations/' + modelType);
            org.set(modelType, model);
            model.save();
            org.save();
            return model;
        });
    }
});
