Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
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