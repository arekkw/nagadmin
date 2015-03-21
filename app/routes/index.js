import Authenticated from 'nag-admin/routes/authenticated';

export default Authenticated.extend({
	beforeModel: function() {
		this.transitionTo('dashboard');
	}
});