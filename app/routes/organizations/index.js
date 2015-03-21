import Authenticated from 'nag-admin/routes/authenticated';

export default Authenticated.extend({
	setupController: function(controller, model) {
		controller.set('model', this.store.findAll('organizations/org'));
        this.store.find('ref/orgtype').then(function(orgTypes) {
            controller.set('orgTypes', orgTypes);
        });

		// could be saved in the future as a preference. For now, the model is 
		// nice since it essentially remembers the last filter state.
		var filterAddress = this.store.getById('address',"filterAddress");
		if(!filterAddress){
        	filterAddress = this.store.createRecord('address', {id:"filterAddress"});
		}
        controller.set('filterAddress', filterAddress);
    }
});