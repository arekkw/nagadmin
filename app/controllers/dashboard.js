import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: "Home",
	breadCrumbIconClass: "ace-icon fa fa-home home-icon",
	
	watchSelectedValue: function(val){
		console.log("here!!");
	}.observes('selectedValue'),
	
	actions: {
	    selectSuggestion: function(item){
	        if(item && item.content){
	            var className = item.content.toString();
	            if(className.indexOf("organizations/profile") > 0){
	                //transition
	                console.log("transition to org " + item.get("id"));
	            } else if(className.indexOf("contact") > 0){
	                console.log("transition to contact " + item.get("id"));
	            }
	        }
	    }
  	}
});