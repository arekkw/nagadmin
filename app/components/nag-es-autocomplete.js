import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import config from '../config/environment';
import Ember from 'ember';
import SetUtils from '../utils/set-utils';

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
        var inputVal = this.get("inputVal");
        if (!inputVal || inputVal.length < 2) {
            this.set('organizations', []);
            return;
        }
        
        var query = Ember.$.ajax({
            type: "POST",
            url: config.elasticsearchPath + '/orgs/profiles/_search',
            data: JSON.stringify({
                "query": {
                    "query_string": {
                       "default_field": "orgName",
                       "query": inputVal
                    }
                },
                "_source": ["org"],
                "size": 10
            })
        });
        
        query.then(data => {
            Ember.run.later(() => {
                this.set('organizations', SetUtils.map(
                    new Set(data.hits.hits),
                    hit => this.store.find('organizations/org', hit._source.org)
                ));
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