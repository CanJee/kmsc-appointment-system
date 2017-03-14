import { Meteor } from 'meteor/meteor';
import { Members } from '../../../imports/api/members.js';

Template.employees.rendered = function(){

};

Template.employees.events({
	'click .add-employee'(event) {
		$('#createEmployeesModal').modal('show');
	},
	'click .edit-employee'(event) {
		$('#editEmployeesModal').modal('show', $(this));
	},
});