Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();
    $("[data-toggle=tooltip]").tooltip({
      	container: '.navbar-static-side',
  	});

};

// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    },
    'click .resend-verification-link' : function(){
      Meteor.call( 'sendVerificationLink', ( error, response ) => {
        if ( error ) {
          toastr.error(error.reason);
        } else {
          let email = Meteor.user().emails[ 0 ].address;
          toastr.success(`Verification email resent to ${ email }!`);
        }
      });
    },

});

Template.navigation.helpers({
  currentUserEmail: function() {
  	if (Meteor.user())
    	return Meteor.user().emails[0].address;
  },
  currentUserName: function() {
  	if (Meteor.user())
    	return Meteor.user().profile.name;
  }
})
