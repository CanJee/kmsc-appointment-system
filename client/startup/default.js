// Run this when the meteor app is started
Meteor.startup(function () {

});

FlowRouter.wait();

Tracker.autorun(function() {
	if (Roles.subscription.ready() && !FlowRouter._initialized) {
		return FlowRouter.initialize();
	}

	if (!Meteor.userId()) {
		if (Session.get('loggedIn')) {
			route = FlowRouter.current();
			Session.set('redirectAfterLogin', route.path);

			return FlowRouter.go(FlowRouter.path('login'));
		}
	}
});