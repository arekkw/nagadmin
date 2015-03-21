import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
	env: function() {
		return config.environment ? config.environment : "unknown";
	}.property(),

	isProd: function() {
		return this.get("env") === 'production';
	}.property(),

	envDisplay: function() {
		return this.get("env").capitalize();
	}.property()
});