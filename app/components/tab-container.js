import Ember from 'ember';
import TabPane from './tab-pane';

export default Ember.Component.extend({
	index: 0,
	tabs: [],

	initTabs: function() {
		var parent = this;
		var tabs = this.get('childViews').filter(function (item) {
			return item instanceof TabPane;
		}).map(function (tab, tabIndex) {
			tab.set('index', tabIndex);
			tab.set('parent', parent);
			return tab;
		});
		this.set('tabs', tabs);
	}.on('didInsertElement'),

	actions: {
		changeTab: function(index) {
			this.set('index', index);
		}
	}
});