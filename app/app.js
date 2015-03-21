import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

Ember.SelectOption.reopen({
  attributeBindings: ['title'],
  title: function() {
    var titlePath = this.get('parentView.optionTitlePath');
    if(titlePath){
      return this.get(titlePath);
    }
  }.property('parentView.optionTitlePath')
});

loadInitializers(App, config.modulePrefix);

export default App;
