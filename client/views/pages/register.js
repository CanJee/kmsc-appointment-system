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
                name: name,
								type: 'user'
            },
        }
        Accounts.createUser( options , function(error){
            if(error){
                toastr.error(error.reason); // Output error if registration fails
            } else {
                FlowRouter.go("calendarView"); // Redirect user if registration succeeds

                Meteor.users.update({_id:Meteor.user()._id}, { $set: { profile: { name: name } } });
            }
        });
    }

});
