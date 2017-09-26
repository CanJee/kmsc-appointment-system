import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Employees = new Mongo.Collection('employees');

Meteor.methods({
	'employees.insert'(name, email, monStart, monEnd, tueStart, tueEnd, wedStart, wedEnd, thuStart, thuEnd, 
		friStart, friEnd, satStart, satEnd, sunStart, sunEnd) {

	    check(name, String);
	    check(email, String);
	    check(monStart, String);
	    check(monEnd, String);
	    check(tueStart, String);
	    check(tueEnd, String);
	    check(wedStart, String);
	    check(wedEnd, String);
	    check(thuStart, String);
	    check(thuEnd, String);
	    check(friStart, String);
	    check(friEnd, String);
	    check(satStart, String);
	    check(satEnd, String);
	    check(sunStart, String);
	    check(sunEnd, String);

	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    employeeId = Employees.insert({
	      	name,
	      	email,
	      	monStart,
	      	monEnd,
	      	tueStart,
	        tueEnd,
	        wedStart,
	        wedEnd,
	        thuStart,
	        thuEnd,
	        friStart,
	        friEnd,
	        satStart,
	        satEnd,
	        sunStart,
	        sunEnd,
	        createdOn: moment().format('MMMM Do YYYY'),
	        createdBy: Meteor.users.findOne(this.userId).profile.name,
	    });

	    if(Meteor.isServer){
	    	HTTP.call( 'POST', 'https://api.timekit.io/v2/calendars', {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC'
	    	  },
			  data: {
			    "name": name + " KMSC Calendar",
			    "description": name + " KMSC work calendar",
			  },
			}, function( error, response ) {
				if (error) {
					console.log(error);
				} else {
					calendarId = response.data.data.id;
					Employees.update({_id : employeeId},{$set:{calendarId}});
					console.log(response);
				}
			});
    	}
	
  	},
  	'employees.find'(employeeId) {
	    check(employeeId, String);

	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Employees.find( { _id: employeeId } ).fetch()[0];
	 },
  	'employees.findAll'(test) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Employees.find().fetch();
  	},
  	'employees.remove'(employeeId) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    employee = Employees.find( { _id: employeeId } ).fetch()[0];

	    if(Meteor.isServer){
	    	HTTP.call( 'DELETE', 'https://api.timekit.io/v2/calendars/' + employee.calendarId, {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC'
	    	  },
			}, function( error, response ) {
				if (error) {
					console.log(error);
				} else {
					console.log(response);
				}
			});
    	}

	    return Employees.remove(employeeId);
  	},
});