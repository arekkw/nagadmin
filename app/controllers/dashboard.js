import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: "Home",
	breadCrumbIconClass: "ace-icon fa fa-home home-icon",
	codes:[],
	
	_selectedValue: function(e,a){
	    console.log(e);
	    console.log(a);
	}.observes('selectedValue')
});