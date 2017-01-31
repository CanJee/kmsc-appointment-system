import { Meteor } from 'meteor/meteor';

Meteor.subscribe("members");

Meteor.methods({
  	'members.remove'(memberId) {
  		check(memberId, String);
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Meteor.users.remove({ _id: memberId });
  	},
});