var l;

Template.loginTwo.rendered = function(){
	$('body').addClass('kmsc-login-bg');
	l = Ladda.create( document.querySelector( '.ladda-button' ) );
};

Template.loginTwo.events({
    'submit form': function(event){
        event.preventDefault();
				l.start();
        var email = $('[type=email]').val();
        var password = $('[type=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                toastr.error(error.reason);
								l.stop();
            } else {
								l.stop();
                FlowRouter.go("calendarView");
            }
        });
    },
		'click .view-calendar'(event) {
			$('#viewCalendarModal').modal('show', $(this));
		},
});
