import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: "Home",
	breadCrumbIconClass: "ace-icon fa fa-home home-icon",
	codes:[],
        
    init: function(){
        this._super();
        var codes = this.get("codes");
        codes.push({code: "ABC", text: "SOMETHING 1"});
        codes.push({code: "ABCD", text: "SOMETHING 2"});
        codes.push({code: "ABCDE", text: "SOMETHING 3"});
        this.set("codes", codes);
    }
});