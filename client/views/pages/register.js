import { HTTP } from 'meteor/http'

Template.register.rendered = function(){
	$('body').addClass('kmsc-login-bg');
};

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var name = $('input#name').val();
        var email = $('input#email').val();
        var password = $('input#password').val();
        var options = {
            email: email,
            password: password,
            profile: {
                name: name
            },
        }
        Accounts.createUser( options , function(error){
            if(error){
                toastr.error(error.reason); // Output error if registration fails
            } else {
                FlowRouter.go("members"); // Redirect user if registration succeeds

                HTTP.call( 'POST', 'https://api.timekit.io/v2/users ', {
				  data: {
				    email: 	options.email, 
	  						timezone: "America/Los_Angeles",
	  						first_name: options.profile.name,
	  						password: options.password
				  },
				  headers: {
			        'Content-Type': 'application/json',
			        'Timekit-App': 'kmsc'
			      }
				}, function( error, response ) {
				  if ( error ) {
				    console.log( error );
				  } else {
				    console.log( response );
				    Meteor.users.update({_id:Meteor.user()._id}, { $set: { api_token : response.data.data.api_token } });
				  }
				});

                Meteor.users.update({_id:Meteor.user()._id}, { $set: { profile: { name: name } } });
            }  
        });
    }

});