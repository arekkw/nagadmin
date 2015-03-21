import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: [':tab-pane', 'active'],

	active: function() {
		return this.get('index') === this.get('parent.index');
	}.property('parent.index')
});