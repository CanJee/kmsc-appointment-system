import { Meteor } from 'meteor/meteor';
import { Employees } from '../../../imports/api/employees.js';

Template.employees.rendered = function(){
	$('.members-list').footable({
		"filtering": {
      "enabled": true
		},
    "sorting": {
			"enabled": true
		},
    "paging": {
			"enabled": true
		}
	});
};

Template.employee.rendered = function(){
	$("[data-toggle=tooltip]").tooltip();
};

Template.employees.helpers({
  employees() {
  	employeesList = Employees.find({});
  	var objArray = [];

	employeesList.forEach(function(obj){
		objArray.push(obj);
	})
	return objArray;
  },
});

Template.employees.events({
	'click .add-employee'(event) {
		$('#createEmployeesModal').modal('show');
	},
	'click .edit-employee'(event) {
		$('#editEmployeesModal').modal('show', $(this));
	},
	'click #get-employee-hours'(event) {
		event.preventDefault();
		$('#employeeHoursModal').modal('show', $(this));
	},
	'click .delete-employee'(event) {
  	event.preventDefault();
  	const employee = $(event.target).attr('employee-id');
  	const name = $(event.target).attr('employee-name')
  	swal({
        title: "Are you sure?",
        text: `Employee ${name} with id ${employee} will be deleted permanently!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false },
    	function (isConfirm) {
	        if (isConfirm) {
				Meteor.call('employees.remove', employee);
	            swal("Deleted!", `Employee ${name} with id ${employee} has been deleted successfully.`, "success");
	        } else {
	            swal("Cancelled", `Employee ${name} with id ${employee} has not been deleted :)`, "error");
	        }
    	});
  },
});
