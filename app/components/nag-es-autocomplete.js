import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import config from '../config/environment';

export default AutoComplete.extend({
    valueProperty: "code",
    options:[],
    suggestions: function() {
        return this.get("options");
    }.property("options.@each"),
    
    click: function(e){
      console.log(e);
    },
    
    didInsertElement: function(a, b){
        console.log("insert");
    },
    
    loadMatches: function() {
        var self = this;
        var inputVal = this.get("inputVal");
        if(!inputVal || inputVal.length < 2){
            return;
        }
        var esSearchBody = {
            "name-suggest" : {
                "text" : inputVal,
                "completion" : {
                    "field" : "suggest",
                    "size" : 5,
                    "fuzzy" : {
                        "fuzziness" : 2
                    }
                }
            }
        };
        Em.$.ajax({
            type: "POST",
            url: config.elasticsearchPath + '/orgs,contacts/_suggest',
            data: JSON.stringify(esSearchBody),
            success: function(data){
                self.set('options', []);
                var store = self.get('container').lookup('store:main');
                Em.$.each(data["name-suggest"][0].options, function(i,obj){
                    if(obj.payload.contactId){
                        store.find('contact', obj.payload.contactId).then(function(contact){
                            self.get('options').pushObject(contact);
                        });
                    } else if(obj.payload.orgId){
                        store.find('organizations/org', obj.payload.orgId).then(function(org){
                            self.get('options').pushObject(org.get('profile'));
                        });
                    }
                });
            },
            error: function(e){
                console.error("Unable to search." + e);
            },
            dataType: 'json'
        });
  }.observes("inputVal"),
  
  optionsToMatch: function() {
      return this.get("options");
  }.property("options.@each"),
  
  	actions: {
	    selectSuggestion: function(item){
	        this.sendAction('action', 'selectSuggestion', item);
	    },
	    selectItem: function(item){
	        this.sendAction('action', 'selectSuggestion', item);
	    }
  	}
});
