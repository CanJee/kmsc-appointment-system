import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Appointments = new Mongo.Collection('appointments');

Meteor.methods({
	'appointments.insert'(startDateStr, endDateStr, durationMinutes, employeeId, employeeName, calendarId, appointmentReason) {

	    check(startDateStr, String);
	    check(endDateStr, String);
	    check(durationMinutes, String);
	    check(employeeName, String);
	    check(employeeId, String);
	    check(calendarId, String);
	    check(appointmentReason, String);

	    // Make sure the user is logged in before inserting a task
	    if (! this.userId && !Meteor.isTest) {
	      throw new Meteor.Error('not-authorized');
	    }

	    appointmentId = Appointments.insert({
	      	startDate: startDateStr,
	      	endDate: endDateStr,
	      	durationMinutes,
	      	employeeName,
	      	employeeId,
	        calendarId,
	        appointmentReason,
	        status: 'pending',
	        userId: this.userId,
	        userName: Meteor.users.findOne(this.userId).profile.name
	    });

	    if(Meteor.isServer){
	    	HTTP.call( 'POST', 'https://api.timekit.io/v2/bookings', {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC',
	    	  	'content-type': 'application/json'
	    	  },
	    	  data: {
				  "graph": "confirm_decline",
					"action": "create",
				  "event": {
				    "start": startDateStr,
				    "end": endDateStr,
				    "what": "Appointment",
				    "where": "Kanjee Medical Skin Care",
				    "calendar_id": calendarId
				  },
				  "customer": {
				    "name": Meteor.users.findOne(this.userId).profile.name,
				    "email": Meteor.users.findOne(this.userId).emails[0].address,
				    "timezone": "America/Toronto"
				  },
				  "settings": {
				    "allow_double_bookings": false
				  },
			  },
			}, function( error, response ) {
				if (error) {
				} else {
					timekitAppointmentId = response.data.data.id;
					Appointments.update({_id : appointmentId},{$set:{timekitAppointmentId}});
				}
			});
    	}

  	},
  	'appointments.find'(appointmentId) {
	    check(appointmentId, String);

	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Appointments.find( { _id: appointmentId } ).fetch()[0];
	 },
  	'appointments.findAll'(test) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Appointments.find().fetch();
  	},
  	'appointments.findUserAppointments'(test) {

	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    return Appointments.find( { userId: this.userId } ).fetch();
	 },
  	'appointments.cancel'(appointmentId) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    appointment = Appointments.find( { _id: appointmentId } ).fetch()[0];

	    if(Meteor.isServer){
	    	HTTP.call( 'PUT', 'https://api.timekit.io/v2/bookings/' + appointment.timekitAppointmentId + '/cancel', {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC',
	    	  	'content-type': 'application/json'
	    	  },
	    	  data: {
				  cancel: {
				  	"message": "Appointment cancelled by " + Meteor.users.findOne(this.userId).profile.name,
				  }
			  },
			}, function( error, response ) {
				if (error) {
				} else {
					Appointments.update({_id : appointmentId},{$set:{'status': 'cancelled'}});
				}
			});
    	}
  	},
		'appointments.approve'(appointmentId) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    appointment = Appointments.find( { _id: appointmentId } ).fetch()[0];

	    if(Meteor.isServer){
	    	HTTP.call( 'PUT', 'https://api.timekit.io/v2/bookings/' + appointment.timekitAppointmentId + '/confirm', {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC',
	    	  	'content-type': 'application/json'
	    	  },
	    	  data: {
				  cancel: {
				  	"message": "Appointment confirmed by " + Meteor.users.findOne(this.userId).profile.name,
				  }
			  },
			}, function( error, response ) {
				if (error) {
				} else {
					Appointments.update({_id : appointmentId},{$set:{'status': 'confirmed'}});
				}
			});
    	}
  	},
		'appointments.decline'(appointmentId) {
	    // Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    appointment = Appointments.find( { _id: appointmentId } ).fetch()[0];

	    if(Meteor.isServer){
	    	HTTP.call( 'PUT', 'https://api.timekit.io/v2/bookings/' + appointment.timekitAppointmentId + '/decline', {
	    	  auth: 'hasan@kanjee.net:gfSRnK7eBkGzy3quGXr6pKKFETU8I52k',
	    	  headers: {
	    	  	'Timekit-App' : 'KMSC',
	    	  	'content-type': 'application/json'
	    	  },
	    	  data: {
				  decline: {
				  	"message": "Appointment declined by " + Meteor.users.findOne(this.userId).profile.name,
				  }
			  },
			}, function( error, response ) {
				if (error) {
				} else {
					Appointments.update({_id : appointmentId},{$set:{'status': 'cancelled'}});
				}
			});
    	}
  	},
});
