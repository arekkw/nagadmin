import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: "Home",
    breadCrumbIconClass: "ace-icon fa fa-home home-icon",

    watchSelectedValue: function() {
        var item = this.get("selectSuggestion");
        if (item) {
            this.transitionToRoute('organizations.edit.profile', item.get("org"));
        }
        this.set("selectSuggestion", null); //set to null in the event the same item is selected twice
    }.observes('selectSuggestion')
});