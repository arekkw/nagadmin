import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: "Home",
    breadCrumbIconClass: "ace-icon fa fa-home home-icon",

    watchSelectedValue: function(item) {
        console.log("here!!");
        if (item) {
            var className = item.toString();
            if (className.indexOf("organizations/profile") > 0) {
                //transition
                console.log("transition to org " + item.get("id"));
            }
            else if (className.indexOf("contact") > 0) {
                console.log("transition to contact " + item.get("id"));
            }
        }
    }.observes('selectSuggestion'),

    actions: {
        selectItem: function(item) {
            if (item) {
                var className = item.toString();
                if (className.indexOf("organizations/profile") > 0) {
                    //transition
                    console.log("transition to org " + item.get("id"));
                }
                else if (className.indexOf("contact") > 0) {
                    console.log("transition to contact " + item.get("id"));
                }
            }
        }
    }
});