import OrgEditBaseRoute from './base';

export default OrgEditBaseRoute.extend({
    model: function() {
        return this._model('income');
    }
});