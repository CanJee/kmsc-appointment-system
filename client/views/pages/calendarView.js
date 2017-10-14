Template.calendarView.rendered = function(){

	Meteor.call('employees.findAll', 'test', function(error, result) {
		if (!error) {
	  		for (i = 0; i < result.length; i++) {
	  			strConst = "<li><a id=" + result[i]._id + ">" + result[i].name + "</a></li>";
	  			$('#select-calendar-dropdown').append(strConst);
	  		}
  		}
  		else {
  			console.log(error);
  		}
  	});

}

Template.calendarView.events({
	'click #select-calendar-dropdown li'(event) {
		event.preventDefault();
		Meteor.call('employees.find', event.target.id, function(error, result) {
			if (!error) {
				Object.keys(result).forEach(function(key){
					if (result[key] == 'CLOSED') {
						result[key] = 0;
					}
				});
				createAndDisplayBookingWidget(result);
	  		}
	  		else {
	  			console.log(error);
	  		}
  		});
	},
});

function createAndDisplayBookingWidget(employee) {
	window.widget = new TimekitBooking();

	window.widget.init({
		// Required
		app:                      'kmsc',   // Your Timekit registered app slug
		email:                    'hasan@kanjee.net',   // Your Timekit user's email (used for auth)
		apiToken:                 'PORLjtleVoIrwkPc7n8Bgaq8YZUqGzOu',   // Your Timekit user's apiToken (as generated through the wizard)
		calendar:                 employee.calendarId,   // Your Timekit calendar ID that bookings should end up in
		employee: 			  	  employee,
		// Optional
		targetEl:                 '#bookingjs', // Which element should we the library load into
		name:                     '',   // Display name to show in the header and timezone helper
		avatar:                   '',   // Provide an image URL for a circular image avatar
		autoload:                 true, // Auto initialization if config object is found on window var
		includeStyles:            true, // Inject fullCalendar and library styles in <head>
		goToFirstEvent:           true, // Display and scroll to the first upcoming event in the calendar (to avoid showing a blank calendar)
		bookingGraph:             'instant', // Set which booking flow graph that should be used (also supports "confirm_decline", see below)

		timekitConfig: {
  			app:          				'kmsc', // Specify your app slug
  			apiBaseUrl:                 'https://api.timekit.io/',
		    apiVersion:                 'v2',
		    timezone:                   'America/Toronto',
		    convertResponseToCamelcase: false,
		    convertRequestToSnakecase:  true,
		    autoFlattenResponse: true
		},
		timekitFindTime: {
			filters: {
				or: [
					{ "specific_day_and_time": {"day": "Monday", "start": employee.monStart, "end": employee.monEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Tuesday", "start": employee.tueStart, "end": employee.tueEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Wednesday", "start": employee.wedStart, "end": employee.wedEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Thursday", "start": employee.thuStart, "end": employee.thuEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Friday", "start": employee.friStart, "end": employee.friEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Saturday", "start": employee.satStart, "end": employee.satEnd, "timezone": "America/Toronto"}},
					{ "specific_day_and_time": {"day": "Sunday", "start": employee.sunStart, "end": employee.sunEnd, "timezone": "America/Toronto"}},
				],
				and: [
					{ "business_hours": {"timezone": "America/Toronto"} },
           			{ "daytime": {"timezone": "America/Toronto"}}
				]
			},
			// future:       '4 weeks',
			length:       '15 minutes',
			//emails:       'hasan@kanjee.net',
			all_solutions: true,
		},
		fullCalendar: {
			eventClick: function(calEvent, jsEvent, view) {
				if (Meteor.user().emails[0].verified) {
					$('#createAppointmentsModal').attr('startDate', calEvent.start._i);
					$('#createAppointmentsModal').attr('endDate', calEvent.end._i);
					$('#createAppointmentsModal').modal('show');
				}
				else {
					swal({
						html:true,
            title: "Error",
            text: `You must verify your email before booking an appointment.`,
            type: "error",
		     });
				}
			},
			minTime: '08:00:00',
			maxTime: '20:00:00',
		},
	})
}
