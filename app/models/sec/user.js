import DS from 'ember-data';
import {fbEmailKeyScrubber} from 'nag-admin/helpers/fb-email-key-scrubber';

export default DS.Model.extend({
	roles: DS.hasMany('sec/role',{ async: true, defaultValue: []}),
	firstName: DS.attr(),
	lastName: DS.attr(),
	email: DS.attr(),
	avatar: DS.attr(),
	createDate: DS.attr('date', {defaultValue: new Date()}),
	lastLoginDate: DS.attr('date'),
	authStore: DS.attr(),
	
	idToEmail: function() {
      return fbEmailKeyScrubber(this.get('id'));
    }.property(),

	fullName: function() {
		return this.get('firstName') + ' ' + this.get('lastName');
	}.property('firstName', 'lastName'),
	
	//stubbed role helpers for now
	isSysAdmin: function() {
		return this._isRole("sysAdmin");
	}.property('roles.@each.id'),
	
	isOrgAdmin: function() {
		return this.get('isSysAdmin') || this._isRole("orgAdmin");
	}.property('roles.@each.id'),
	
	isUserAdmin: function() {
		return this.get('isSysAdmin') || this._isRole("userAdmin");
	}.property('roles.@each.id'),
	
	isOrgEditor: function() {
		return this.get('isSysAdmin') || this.get('isOrgAdmin') || this._isRole("orgEditor");
	}.property('roles.@each.id'),
	
	rolesToString: function() {
		return this.get('roles').reduce(function (str, role, index) {
		  if (index === 0) {
		    return role.get('display');
		  } else {
		    return str + ', ' + role.get('display');
		  }
		});
	}.property('roles.@each.display'),
	
	//deletes old relations and adds new
	replaceRoleRelations: function(newRoles){
		var existingRoles = this.get('roles');
		existingRoles.forEach(function(existingRole){
			if(!newRoles.contains(existingRole)){
				existingRoles.removeObject(existingRole);
			}
		});
		
		var self = this;
		newRoles.forEach(function(newRole){
			if(!existingRoles.contains(newRole)){
				self.get('roles').addObject(newRole);
			}
		});
	},
	
	_roles: function(){
		return this.get('roles');
	}.property('roles.content.content'),
	
	_isRole: function(roleId){
		return this.get('roles').any(function(role) {
	  		return roleId === role.get('id');
		});
	}
});