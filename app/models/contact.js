import DS from 'ember-data';

export default DS.Model.extend({
	email: DS.attr('string'),
	img_url: DS.attr('string'),
	name: DS.attr('string'),
	cellNumber: DS.attr('string'),
	landlineNumber: DS.attr('string'),
	faxNumber: DS.attr('string'),
	type: DS.belongsTo('ref/contacttype', {
		async: true
	}),
	primary: DS.attr('boolean', {
		defaultValue: true
	}),
	createDate: DS.attr('date', {
		defaultValue: new Date()
	}),
	lastUpdateDate: DS.attr('date'),
	
	selectedType: function(k,type) {
		if(type === undefined) {//initial load
			if(this.get('type')){
				type = this.get('type');
			}
		} else { // null implies province is explicitly changed
            this.set('type', type);
        }
        return type;
	}.property('type'),

	preferCellPhone: function() {
		if (this.get('cellNumber')) {
			return this.get('cellNumber');
		}
		else if (this.get('landlineNumber')) {
			return this.get('landlineNumber');
		}
		else {
			return '';
		}
	}.property('cellNumber', 'landlineNumber'),
	
	orgs: function() {
		var self = this;
		if(!this.get('_orgProfiles')){
			// fixme: BAD!! We need findQuery in emberfire!!
			// https://github.com/firebase/emberfire/issues/66
			this.store.find('organizations/profile').then(function(profiles){
				self.set('_orgProfiles', profiles.filterBy('contact.id', self.get('id')));
			});
		}
		return	this.get('_orgProfiles');
	}.property('_orgProfiles')
});