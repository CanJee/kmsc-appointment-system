import { Meteor } from 'meteor/meteor';

Template.employeeHoursModalTemplate.rendered = function(){
	
};

Template.employeeHoursModalTemplate.events({
  'show.bs.modal #employeeHoursModal': function(e){
    id = $(e.relatedTarget)[0]._id
    Meteor.call('employees.find', id, function(error, result) {
	    if (!error) {
	    	$("#emp-name").val(result.name);
	    	$("#emp-email").val(result.email);

        $("#mon-start").val(result.monStart);
        $("#mon-end").val(result.monEnd);

        $("#tue-start").val(result.tueStart);
        $("#tue-end").val(result.tueEnd);

        $("#wed-start").val(result.wedStart);
        $("#wed-end").val(result.wedEnd);

        $("#thu-start").val(result.thuStart);
        $("#thu-end").val(result.thuEnd);

        $("#fri-start").val(result.friStart);
        $("#fri-end").val(result.friEnd);

        $("#sat-start").val(result.satStart);
        $("#sat-end").val(result.satEnd);

        $("#sun-start").val(result.sunStart);
        $("#sun-end").val(result.sunEnd);

        $(".employee-hours-modal").html("<span class='text-success font-bold'>" + result.name + "</span>" + " (" + id + ") Hours");
	    }
	});
  },
});