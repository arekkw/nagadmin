import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.resource('dashboard', function() {
		this.route('test');
		this.route('profile', {
			path: '/profile'
		});


		this.resource('organizations', function() {
			this.route('new');
			this.route('edit', {
				path: ':org_id'
			}, function() {
				this.route('profile');
				this.route('infra');
				this.route('reg');
				this.route('income');
				this.route('prog');
				this.route('doc');
				this.route('gallery');
			});
		});

		this.resource('contacts', function() {
			this.route('edit', {
				path: '/:id'
			});
		});

		this.resource('admin', function() {
			this.resource('users', function() {
				this.route('index');
				this.route('add');
			});
		});

		if (!config.isProd) {
			this.resource('devComponentUpload');
			this.resource('devComponentModal');
			this.resource('dev-component-address-select');
		}
		this.route('not-found', {
			path: '/*path'
		});
		this.route('error');
	});

	this.resource('security', function() {
		this.route('login');
	});

	this.route('not-found', {
		path: '/*path'
	});
});

export default Router;
