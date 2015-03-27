import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import config from '../config/environment';
import Ember from 'ember';

export default AutoComplete.extend({
    valueProperty: "id",

    suggestions: function() {
        return this.get("options");
    }.property("options.@each"),

    loadMatches: function() {
        var self = this;
        var inputVal = this.get("inputVal");
        if (!inputVal || inputVal.length < 3) {
            return;
        }
        var esSearchBody = {
            "name-suggest": {
                "text": inputVal,
                "completion": {
                    "field": "suggest",
                    "size": 10,
                    "fuzzy": {
                        "fuzziness": 2
                    }
                }
            }
        };
        var ops = [];
        Ember.$.ajax({
            type: "POST",
            url: config.elasticsearchPath + '/orgs/_suggest',
            data: JSON.stringify(esSearchBody),
            success: function(data) {
                self.set('options', []);
                var store = self.get('container').lookup('store:main');
                var dedup = {};
                Ember.$.each(data["name-suggest"][0].options, function(i, obj) {
                    var id = obj.payload.orgId;
                    if (id && !(id in dedup)) {
                        //dedup
                        dedup[id] = true;
                        store.find('organizations/org', id).then(function(org) {
                            ops.pushObject(org.get('profile'));
                        });
                    } else {
                        console.debug("duplicate ignored: " + id);
                    }
                    self.set('options', ops);
                });
            },
            error: function(e) {
                console.error("Unable to search." + e);
                self.set('options', []);
            },
            dataType: 'json'
        });
    }.observes("inputVal"),

    optionsToMatch: function() {
        return this.get("options");
    }.property("options.@each"),

    actions: {
        selectItem: function(item) {
            this.setProperties({
                'parentView.controller.selectSuggestion': item,
                'options': [],
                'inputVal': ""
            });
            this.focusOut();
        }
    }
});