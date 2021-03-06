var exposed;
var loggedIn;
var admin;

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        toastr.error( error.reason );
        FlowRouter.go('login');
      } else {
          FlowRouter.go('calendarView');
          toastr.success( 'Email verified! Thanks!' );
      }
    });
  }
});

exposed = FlowRouter.group({});

loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('login');
      }
    }
  ]
});

// admin = loggedIn.group({
// 	prefix: '/admin'({
// 		triggersEnter: [
// 			function() {
// 			    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
// 			    	return FlowRouter.go(FlowRouter.path('members'));
// 			    }
// 			}
// 		]
// 	})
// });

Accounts.onLogin(function() {
	var redirect;
	redirect = Session.get('redirectAfterLogin');
	if (redirect != null) {
		if (redirect !== '/login') {
			return FlowRouter.go(redirect);
		}
	}
	$('body').removeClass('kmsc-login-bg');
});

Accounts.onLogin(function() {
	Meteor.logoutOtherClients();
	return Session.set('loggedIn', true);
	$('body').removeClass('kmsc-login-bg');
});


function isAdmin() {
	if (Roles.userIsInRole( Meteor.userId(), 'admin' )) {
		return true;
	}
	else {
		return false;
	}
}

// FlowRouter.route('/register', {
//     action: function() {
//     	if (!Meteor.userId()) {
//         	BlazeLayout.render("blankLayout", {content: "register"});
//         } else {
//         	FlowRouter.go('members', {replaceState: true});
//         }
//     }
// });

// FlowRouter.route('/login', {
//     action: function() {
//     	if (!Meteor.userId()) {
//         	BlazeLayout.render("blankLayout", {content: "loginTwo"});
//         } else {
//         	FlowRouter.go('members', {replaceState: true});
//         }
//     }
// });

exposed.route('/register', {
	name: 'register',
	action: function() {
		BlazeLayout.render("blankLayout", {content: "register"});
	}
});

exposed.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render("blankLayout", {content: "loginTwo"});
	}
});

exposed.route('/errorOne', {
	name: 'errorOne',
	action: function() {
		BlazeLayout.render("blankLayout", {content: "errorOne"});
	}
});

exposed.route('/errorTwo', {
	name: 'errorTwo',
	action: function() {
		BlazeLayout.render("blankLayout", {content: "errorOne"});
	}
});

exposed.route('/', {
	name: 'default',
    action: function() {
        FlowRouter.go('login');
    }
});

// exposed.route('/*', {
// 	name: 'allNotDefinedRoutes',
// 	action: function() {
// 		FlowRouter.go('errorOne');
// 	}
// });

loggedIn.route('/members', {
	name: 'members',
    action: function() {
    	BlazeLayout.render("mainLayout", {content: "members"});
    }
});

loggedIn.route('/employees', {
	name: 'employees',
    action: function() {
    	BlazeLayout.render("mainLayout", {content: "employees"});
    }
});

loggedIn.route('/adminAppointments', {
	name: 'adminAppointments',
    action: function() {
    	BlazeLayout.render("mainLayout", {content: "adminAppointments"});
    }
});

loggedIn.route('/myAppointments', {
	name: 'userAppointments',
    action: function() {
    	BlazeLayout.render("mainLayout", {content: "userAppointments"});
    }
});

loggedIn.route('/pageOne', {
	name: 'pageOne',
    action: function() {
        BlazeLayout.render("mainLayout", {content: "pageOne"});
    }
});

loggedIn.route('/calendarView', {
	name: 'calendarView',
    action: function() {
        BlazeLayout.render("mainLayout", {content: "calendarView"});
    }
});


loggedIn.route('/errorOne', {
	name: 'errorOneAuth',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "errorTwo"});
	}
});

loggedIn.route('/errorTwo', {
	name: 'errorTwoAuth',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "errorTwo"});
	}
});

// loggedIn.route('/*', {
// 	name: 'allNotDefinedRoutesAuth',
// 	action: function() {
// 		FlowRouter.go('errorOneAuth');
// 	}
// });

loggedIn.route('/logout', {
	name: 'logout',
	action: function() {
		return Meteor.logout(function() {
			return FlowRouter.go(FlowRouter.path('login'));
		});
	}
});

// FlowRouter.notFound = {
//   action: function() {
//     return BlazeLayout.render('errorOne');
//   }
// };
