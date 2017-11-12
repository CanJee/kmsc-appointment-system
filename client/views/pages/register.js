import { HTTP } from 'meteor/http'

var l;

Template.register.rendered = function(){
	$('body').addClass('kmsc-login-bg');
	l = Ladda.create( document.querySelector( '.ladda-button' ) );
};

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
				l.start()
        var name = $('input#name').val();
        var email = $('input#email').val();
        var password = $('input#password').val();
        var options = {
            email: email,
            password: password,
            profile: {
                name: name,
								type: 'user'
            },
						roles: [
							'user'
						]
        }
        Accounts.createUser( options , function(error){
            if(error){
                toastr.error(error.reason); // Output error if registration fails
								l.stop()
            } else {
							Meteor.call( 'sendVerificationLink', ( error, response ) => {
			          if ( error ) {
			            toastr.error(error.reason);
									l.stop()
			          } else {
									toastr.success("Account created successfully! Please verify your email.");
			            FlowRouter.go("calendarView"); // Redirect user if registration succeeds

									Meteor.users.update({_id:Meteor.user()._id}, { $set: { profile: { name: name } } });
									l.stop()
			          }
			        });
            }
        });

    }

});
