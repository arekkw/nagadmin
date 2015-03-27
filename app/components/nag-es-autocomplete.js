import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import config from '../config/environment';

export default AutoComplete.extend({
    valueProperty: "id",

    suggestions: function() {
        return this.get("options");
    }.property("options.@each"),

    loadMatches: function() {
        var self = this;
        var inputVal = this.get("inputVal");
        if (!inputVal || inputVal.length < 2) {
            return;
        }
        var esSearchBody = {
            "name-suggest": {
                "text": inputVal,
                "completion": {
                    "field": "suggest",
                    "size": 5,
                    "fuzzy": {
                        "fuzziness": 2
                    }
                }
            }
        };
        Em.$.ajax({
            type: "POST",
            url: config.elasticsearchPath + '/orgs/_suggest',
            data: JSON.stringify(esSearchBody),
            success: function(data) {
                self.set('options', []);
                var store = self.get('container').lookup('store:main');
                Em.$.each(data["name-suggest"][0].options, function(i, obj) {
                    var ops = self.get('options');
                    if (obj.payload.orgId) {
                        store.find('organizations/org', obj.payload.orgId).then(function(org) {
                            ops.pushObject(org.get('profile'));
                        });
                    }
                    self.set('options', ops);
                });
            },
            error: function(e) {
                console.error("Unable to search." + e);
            },
            dataType: 'json'
        });
    }.observes("inputVal"),

    optionsToMatch: function() {
        return this.get("options");
    }.property("options.@each"),

    actions: {
        selectItem: function(item) {
            this.get('parentView.controller').set('selectSuggestion', item);
            this.focusOut();
        }
    }
});
