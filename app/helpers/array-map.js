import Ember from 'ember';

export function arrayMap(_array) {
    var map = Ember.$.map(_array, function(el, key) { 
        if(!Em.get(el, 'id')){
            el.id = key;
        }
        return el; 
    });
    return map;
}

export default Ember.Handlebars.makeBoundHelper(arrayMap);