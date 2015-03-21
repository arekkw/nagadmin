import DS from 'ember-data';

export default DS.Model.extend({
    org: DS.belongsTo('organizations/org',{ async: true}),
    createDate: DS.attr('date', {defaultValue: new Date()}),
    lastUpdateDate: DS.attr('date'),
	orgName: DS.attr('string'),
	img_url: DS.attr('string'),
	establishedDate: DS.attr('string'),
	orgTypes: DS.hasMany('ref/orgtype', {async: true}),
	privateOrg: DS.attr('boolean', {defaultValue: false}),
	nonProfitOrg: DS.attr('boolean', {defaultValue: false}),
	numChildren: DS.attr('number'),
	numStaff: DS.attr('number'),
	daysOfOp: DS.hasMany('ref/daysOfWeek'),
	hoursOfOp: DS.attr('string'),
	openHolidays: DS.attr('boolean', {defaultValue: false}),
	mealsProvided: DS.attr('boolean', {defaultValue: false}),
	chargesFee: DS.attr('boolean', {defaultValue: false}),
	urban: DS.attr('boolean'),
	contact: DS.belongsTo('contact',{ async: true}),
	address: DS.belongsTo('address',{ async: true}),

	_displayOrgTypes: function() {
		var self = this;
		this.get('orgTypes').then(function(types){
			var display = '';
			types.forEach(function(type){
				if(display.length > 0){
					display+=', ';
				}
				display+=type.get('display');
			});
			self.set('displayOrgTypes', display);
		});
	}.observes('orgTypes')
});
