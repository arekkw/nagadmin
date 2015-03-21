import OrgEditBaseRoute from './base';

export default OrgEditBaseRoute.extend({
    model: function() {
        return this._model('gallery');
    },
    setupController: function(controller, model) {
        controller.clear();
        controller.set('accessToken', this.authentication.get('google.accessToken'));
        controller.set('galleryPicsDir', 'orgs/galleryPics/' + model.get('id'));
        controller.set('model', model);
    }
});
