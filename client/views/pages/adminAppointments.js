import { Meteor } from 'meteor/meteor';
import { Appointments } from '../../../imports/api/appointments.js';

Template.adminAppointments.rendered = function(){

};

Template.adminAppointments.helpers({
  appointments() {
  	appointmentsList = Appointments.find({});
  	var objArray = [];
  	
	appointmentsList.forEach(function(obj){

		startJsDate = new Date(obj.startDate);

		formattedMins = ('0' + startJsDate.getMinutes()).slice(-2);
    	formattedTimeStr = startJsDate.getHours() + ':' + formattedMins;

    	obj.time = formattedTimeStr;
    	obj.startDate = formatDate(startJsDate);

    	if (obj.status == 'confirmed') {
    		obj.green = true;
    	}
    	else if (obj.status == 'canceled') {
    		obj.green = false;
    	}

		objArray.push(obj);
	})
	return objArray;
  },
});

function formatDate(date) {
    var dayNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
    ];
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var dayIndex = date.getDay();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return dayNames[dayIndex] + ', ' + monthNames[monthIndex] + ' ' + day + ', ' + year;
}