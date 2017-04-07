import { Meteor } from 'meteor/meteor';
import { Appointments } from '../../../imports/api/appointments.js';

Template.createAppointmentsModalTemplate.rendered = function() {
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" },
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
    $('.chosen-container.chosen-container-single').attr("style", "width: 545px !important;");
    $('.chosen-container.chosen-container-single .chosen-drop').attr("style", "width: 545px !important;");
};

Template.createAppointmentsModalTemplate.events({
    'show.bs.modal #createAppointmentsModal' (e) {
        startDateStr = $($(e.currentTarget)[0]).attr('startDate');
        endDateStr = $($(e.currentTarget)[0]).attr('endDate');

        startJsDate = new Date(startDateStr);
        endJsDate = new Date(endDateStr);

        durationMinutes = Math.floor((endJsDate - startJsDate)/60000) + '';

        formattedMins = ('0' + startJsDate.getMinutes()).slice(-2);
        formattedTimeStr = startJsDate.getHours() + ':' + formattedMins
        $("#prefilled-employee").val(window.widget.getConfig().employee.name);
        $("#prefilled-date").val(formatDate(startJsDate));
        $("#prefilled-time").val(formattedTimeStr);
        $("#prefilled-duration").val(durationMinutes + ' Minutes');
    },
    'submit #create-appointment-form' (e) {
        e.preventDefault();

        appointmentReason = $('#appointment-reason').val();
        employeeId = window.widget.getConfig().employee._id;
        employeeName = window.widget.getConfig().employee.name;
        calendarId = window.widget.getConfig().calendar;

        Meteor.call('appointments.insert', startDateStr, endDateStr, durationMinutes, employeeId, employeeName, calendarId, appointmentReason, function(error, result) {
            if (!error) {

                $('#createAppointmentsModal').modal('hide');

                toastr.success('Appointment created successfully.');

                $('#create-appointments-form')[0].reset();

            }
            else {
                console.log(error);
            }

        });
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
