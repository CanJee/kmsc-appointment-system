import { Meteor } from 'meteor/meteor';
import { Appointments } from '../../../imports/api/appointments.js';

Template.adminAppointment.rendered = function(){
	$("[data-toggle=tooltip]").tooltip();
};

Template.adminAppointment.events({
	'click .cancel-appointment'(event) {
  		event.preventDefault();
  		const appointmentId = $(event.target).attr('appointment-id');
  		const employeeName = $(event.target).attr('employee-name')
  		const date = $(event.target).attr('appointment-date')
  		const time = $(event.target).attr('appointment-time')

  	swal({
        title: "Are you sure?",
        text: `Appointment with ${employeeName} at ${date} ${time} will be cancelled!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false },
    	function (isConfirm) {
	        if (isConfirm) {
				Meteor.call('appointments.cancel', appointmentId);
	            swal("Cancelled!", `Appoitnment with ${employeeName} at ${date} ${time} has been canceled successfully.`, "success");
	        } else {
	            swal("Not Cancelled", `Appointment has not been cancelled!`, "error");
	        }
    	});
  },
  'click .decline-appointment'(event) {
  		event.preventDefault();
  		const appointmentId = $(event.target).attr('appointment-id');
  		const employeeName = $(event.target).attr('employee-name')
  		const date = $(event.target).attr('appointment-date')
  		const time = $(event.target).attr('appointment-time')

  	swal({
        title: "Are you sure?",
        text: `Appointment with ${employeeName} at ${date} ${time} will be declined!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, decline it!",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false },
    	function (isConfirm) {
	        if (isConfirm) {
				Meteor.call('appointments.decline', appointmentId);
	            swal("Declined!", `Appoitnment with ${employeeName} at ${date} ${time} has been declined successfully.`, "success");
	        } else {
	            swal("Not Declined", `Appointment has not been declined!`, "error");
	        }
    	});
  },
  'click .approve-appointment'(event) {
  		event.preventDefault();
  		const appointmentId = $(event.target).attr('appointment-id');
  		const employeeName = $(event.target).attr('employee-name')
  		const date = $(event.target).attr('appointment-date')
  		const time = $(event.target).attr('appointment-time')

  	swal({
        title: "Are you sure?",
        text: `Appointment with ${employeeName} at ${date} ${time} will be approved!`,
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false },
    	function (isConfirm) {
	        if (isConfirm) {
				Meteor.call('appointments.approve', appointmentId);
	            swal("Approved!", `Appointment with ${employeeName} at ${date} ${time} has been approved successfully.`, "success");
	        } else {
	            swal("Not approved", `Appointment has not been approved!`, "warning");
	        }
    	});
  },
});
