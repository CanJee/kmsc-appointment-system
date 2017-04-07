import { Meteor } from 'meteor/meteor';
import { Appointments } from '../../../imports/api/appointments.js';

Template.appointment.rendered = function(){
	$("[data-toggle=tooltip]").tooltip();
};

Template.appointment.events({
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
});