import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import config from '../config/environment';
import Ember from 'ember';

export default AutoComplete.extend({
    valueProperty: "id",
    
    init: function() {
        this.store = this.get('container').lookup('store:main');
        this._super(arguments);
    },

    suggestions: Ember.computed.mapBy('organizations', 'profile'),
    options: Ember.computed.mapBy('organizations', 'profile'),
    
    mouseDown: function(a) {
        a.target.click();
    },

    loadMatches: function() {
        // var self = this;
        var inputVal = this.get("inputVal");
        if (!inputVal || inputVal.length < 3) {
            return;
        }
        
        var query = Ember.$.ajax({
            type: "POST",
            url: config.elasticsearchPath + '/orgs/_suggest',
            data: JSON.stringify({
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
            })
        });
        
        query.then(data => {
            Ember.run.later(() => {
                var ids = Ember.Set.create();
                var organizations = Ember.EnumerableUtils.filter(data['name-suggest'][0].options, option => {
                    var id = option.payload.orgId;
                    var isDuplicate = ids.contains(id);
                    ids.add(id);
                    return !isDuplicate;
                }).map(option => this.store.find('organizations/org', option.payload.orgId));
                
                this.set('organizations', organizations);
            });
        }, error => {
            console.error('Search failed', error);
            Ember.run.later(() => this.set('organizations', []));
        });
    }.observes("inputVal"),

    optionsToMatch: function() {
        return this.get("organizations");
    }.property("options.@each"),

    actions: {
        selectItem: function(item) {
            this.setProperties({
                'parentView.controller.selectSuggestion': item,
                'organizations': [],
                'inputVal': ""
            });
            this.focusOut();
        }
    }
});