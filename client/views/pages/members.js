import { Meteor } from 'meteor/meteor';
import { Members } from '../../../imports/api/members.js';

var editMemberId;

Template.members.rendered = function(){

};

Template.members.events({
	'click .add-member'(event) {
		$('#createMembersModal').modal('show');
	},
	'click .edit-member'(event) {
		$('#editMembersModal').modal('show', $(this));
	},
});

Template.members.helpers({
  members() {
  	membersList = Meteor.users.find({});
  	var objArray = [];
  	var monthNames = 	[
						  "January", "February", "March",
						  "April", "May", "June", "July",
						  "August", "September", "October",
						  "November", "December"
						];
	membersList.forEach(function(obj){
		var date = new Date(obj.createdAt);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		obj['formattedDate'] = monthNames[monthIndex] + " " + day.toString() + ", " + year + " " + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();
		obj['email'] = obj.emails[0].address;
		obj['memberName'] = obj.profile.name;

		if (Roles.userIsInRole( obj._id, 'admin' )) {
			obj['statusYellow'] = false;
		}
		else {
			obj['statusYellow'] = true;
		}
		objArray.push(obj);
	})
	return objArray;
  },
});

Template.member.events({
	'click .delete-member'(event) {
		memberId = $(event.target).attr('member-id');
		if (Meteor.userId() === memberId) {
			swal({
					html:true,
		            title: "Error",
		            text: `You cannot delete yourself!`,
		            type: "error",
		        });
		}
		else {
			swal({
				html:true,
	        	title: "Are you sure?",
	        	text: `Member with ID <strong>${memberId}</strong> will be deleted permanently!`,
	        	type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Yes, delete it!",
		        cancelButtonText: "No, cancel plx!",
		        closeOnConfirm: false,
		        closeOnCancel: false 
		    },
	    	function (isConfirm) {
		        if (isConfirm) {
					Meteor.call('members.remove', memberId, function(error, result) {
						if (!error) {
							swal({
				            	html:true,
					            title: "Deleted!",
					            text: `Member with ID <strong>${memberId}</strong> has been deleted successfully.`,
					            type: "success",
					        },
				        	function(){
							    toastr.success('User removed successfully.');
							});
						}
					});
		            
		        } else {
					swal({
						html:true,
			            title: "Cancelled",
			            text: `Member with ID <strong>${memberId}</strong> has not been deleted :)`,
			            type: "error",
			        });
		        }
	    	});
		}
	},
});

Template.member.rendered = function(){
	$("[data-toggle=tooltip]").tooltip({
    	container: 'body',
	});
};

Template.createMembersModalTemplate.rendered = function(){
	var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"},
	}
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
	$('.chosen-container.chosen-container-single').attr("style", "width: 545px !important;");
	$('.chosen-container.chosen-container-single .chosen-drop').attr("style", "width: 545px !important;");
	$($('#member-role').closest('div')).find('.chosen-search').attr("style", "display: none;");
	$("#create-member-form").validate({
        errorPlacement: function(error, element) {
	    	error.insertAfter($(element).closest('.input-group'));
    	},
    });
};

Template.createMembersModalTemplate.events({
	'submit #create-member-form'(event) {
		event.preventDefault();
		name = $('#member-name').val()
		email = $('#member-email').val();
		password = $('#member-password').val();
		role = $('#member-role').val();

        var userCreated = Meteor.call('members.create', email, password, name, role, function(error, result) {
        	if (!error && result === true) {
        		$('#createMembersModal').modal('hide');
        		toastr.success('Member created successfully.');
        	}
        });
	},
});

Template.editMembersModalTemplate.rendered = function(){
	var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"},
	}
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
	$('.chosen-container.chosen-container-single').attr("style", "width: 545px !important;");
	$('.chosen-container.chosen-container-single .chosen-drop').attr("style", "width: 545px !important;");
	$($('#edit-member-role').closest('div')).find('.chosen-search').attr("style", "display: none;");
	$("#edit-member-form").validate({
        errorPlacement: function(error, element) {
	    	error.insertAfter($(element).closest('.input-group'));
    	},
    });
};

Template.editMembersModalTemplate.events({
	'show.bs.modal #editMembersModal': function(e){
		editMemberId = $(event.target).attr('member-id');
		member = Meteor.users.find({_id : editMemberId}).fetch()[0];
		$('#edit-member-name').val(member.profile.name);
		$('#edit-member-email').val(member.emails[0].address);
	},
	'submit #edit-member-form'(event) {
		event.preventDefault();
		name = $('#edit-member-name').val()
		email = $('#edit-member-email').val();
		password = $('#edit-member-password').val();
		role = $('#edit-member-role').val();

		var userCreated = Meteor.call('members.update', editMemberId, email, password, name, role, function(error, result) {
        	if (!error && result === true) {
        		$('#editMembersModal').modal('hide');
        		toastr.success('Member updated successfully.');
        	}
        });
	},
});