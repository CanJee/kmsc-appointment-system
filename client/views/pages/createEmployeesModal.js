import { Meteor } from 'meteor/meteor';
import { Members } from '../../../imports/api/members.js';

var validator;

Template.createEmployeesModalTemplate.rendered = function(){
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

    $('#monday-status-btn').attr('status', 'open');
    $('.monday-start').clockpicker();
    $('.monday-end').clockpicker();

    $('#tuesday-status-btn').attr('status', 'open');
    $('.tuesday-start').clockpicker();
    $('.tuesday-end').clockpicker();

    $('#wednesday-status-btn').attr('status', 'open');
    $('.wednesday-start').clockpicker();
    $('.wednesday-end').clockpicker();

    $('#thursday-status-btn').attr('status', 'open');
    $('.thursday-start').clockpicker();
    $('.thursday-end').clockpicker();

    $('#friday-status-btn').attr('status', 'open');
    $('.friday-start').clockpicker();
    $('.friday-end').clockpicker();

    $('#saturday-status-btn').attr('status', 'open');
    $('.saturday-start').clockpicker();
    $('.saturday-end').clockpicker();

    $('#sunday-status-btn').attr('status', 'open');
    $('.sunday-start').clockpicker();
    $('.sunday-end').clockpicker();

    validator = $("#create-employee-form").validate({
        rules: {
            time: {
                required: true,
                time24: true,
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter($(element).closest('.input-group'));
          },
    });

};

Template.createEmployeesModalTemplate.events({
    'click #monday-status-btn'(event) {
        event.preventDefault();
        $('#monday-start').prop('disabled', function(i, v) { return !v; });
        $('#monday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#monday-status-btn').attr('status') == 'open') {
            $('#monday-status-btn').attr('status', 'closed');
            $('#monday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#monday-status-btn').html('Open');

            $('#monday-start').attr('value', ' ');
            $('#monday-end').attr('value', ' ');

            $('#monday-start-error').attr('style', 'display:none;');
            $('#monday-end-error').attr('style', 'display:none;');
        }
        else if ($('#monday-status-btn').attr('status') == 'closed'){
            $('#monday-status-btn').attr('status', 'open');
            $('#monday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#monday-status-btn').html('Closed');

            $('#monday-start').attr('value', '00:00');
            $('#monday-end').attr('value', '00:00');
        }
    },

    'click #tuesday-status-btn'(event) {
        event.preventDefault();
        $('#tuesday-start').prop('disabled', function(i, v) { return !v; });
        $('#tuesday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#tuesday-status-btn').attr('status') == 'open') {
            $('#tuesday-status-btn').attr('status', 'closed');
            $('#tuesday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#tuesday-status-btn').html('Open');

            $('#tuesday-start').attr('value', ' ');
            $('#tuesday-end').attr('value', ' ');

            $('#tuesday-start-error').attr('style', 'display:none;');
            $('#tuesday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#tuesday-status-btn').attr('status', 'open');
            $('#tuesday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#tuesday-status-btn').html('Closed');

            $('#tuesday-start').attr('value', '00:00');
            $('#tuesday-end').attr('value', '00:00');
        }
    },

    'click #wednesday-status-btn'(event) {
        event.preventDefault();
        $('#wednesday-start').prop('disabled', function(i, v) { return !v; });
        $('#wednesday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#wednesday-status-btn').attr('status') == 'open') {
            $('#wednesday-status-btn').attr('status', 'closed');
            $('#wednesday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#wednesday-status-btn').html('Open');

            $('#wednesday-start').attr('value', ' ');
            $('#wednesday-end').attr('value', ' ');

            $('#wednesday-start-error').attr('style', 'display:none;');
            $('#wednesday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#wednesday-status-btn').attr('status', 'open');
            $('#wednesday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#wednesday-status-btn').html('Closed');

            $('#wednesday-start').attr('value', '00:00');
            $('#wednesday-end').attr('value', '00:00');
        }
    },

    'click #thursday-status-btn'(event) {
        event.preventDefault();
        $('#thursday-start').prop('disabled', function(i, v) { return !v; });
        $('#thursday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#thursday-status-btn').attr('status') == 'open') {
            $('#thursday-status-btn').attr('status', 'closed');
            $('#thursday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#thursday-status-btn').html('Open');

            $('#thursday-start').attr('value', ' ');
            $('#thursday-end').attr('value', ' ');

            $('#thursday-start-error').attr('style', 'display:none;');
            $('#thursday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#thursday-status-btn').attr('status', 'open');
            $('#thursday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#thursday-status-btn').html('Closed');

            $('#thursday-start').attr('value', '00:00');
            $('#thursday-end').attr('value', '00:00');
        }
    },

    'click #friday-status-btn'(event) {
        event.preventDefault();
        $('#friday-start').prop('disabled', function(i, v) { return !v; });
        $('#friday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#friday-status-btn').attr('status') == 'open') {
            $('#friday-status-btn').attr('status', 'closed');
            $('#friday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#friday-status-btn').html('Open');

            $('#friday-start').attr('value', ' ');
            $('#friday-end').attr('value', ' ');

            $('#friday-start-error').attr('style', 'display:none;');
            $('#friday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#friday-status-btn').attr('status', 'open');
            $('#friday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#friday-status-btn').html('Closed');

            $('#friday-start').attr('value', '00:00');
            $('#friday-end').attr('value', '00:00');
        }
    },

    'click #saturday-status-btn'(event) {
        event.preventDefault();
        $('#saturday-start').prop('disabled', function(i, v) { return !v; });
        $('#saturday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#saturday-status-btn').attr('status') == 'open') {
            $('#saturday-status-btn').attr('status', 'closed');
            $('#saturday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#saturday-status-btn').html('Open');

            $('#saturday-start').attr('value', ' ');
            $('#saturday-end').attr('value', ' ');

            $('#saturday-start-error').attr('style', 'display:none;');
            $('#saturday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#saturday-status-btn').attr('status', 'open');
            $('#saturday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#saturday-status-btn').html('Closed');

            $('#saturday-start').attr('value', '00:00');
            $('#saturday-end').attr('value', '00:00');
        }
    },

    'click #sunday-status-btn'(event) {
        event.preventDefault();
        $('#sunday-start').prop('disabled', function(i, v) { return !v; });
        $('#sunday-end').prop('disabled', function(i, v) { return !v; });
        
        if ($('#sunday-status-btn').attr('status') == 'open') {
            $('#sunday-status-btn').attr('status', 'closed');
            $('#sunday-status-btn').removeClass('btn-danger').addClass('btn-primary');
            $('#sunday-status-btn').html('Open');

            $('#sunday-start').attr('value', ' ');
            $('#sunday-end').attr('value', ' ');

            $('#sunday-start-error').attr('style', 'display:none;');
            $('#sunday-end-error').attr('style', 'display:none;');
        }
        else if ($('#tuesday-status-btn').attr('status') == 'closed'){
            $('#sunday-status-btn').attr('status', 'open');
            $('#sunday-status-btn').removeClass('btn-primary').addClass('btn-danger');
            $('#sunday-status-btn').html('Closed');

            $('#sunday-start').attr('value', '00:00');
            $('#sunday-end').attr('value', '00:00');
        }
    },

    'click #create-employee-btn'(event) {

        _.defer(function() { 
            $('#monday-start').blur();
            $('#monday-end').blur();

            $('#tuesday-start').blur();
            $('#tuesday-end').blur();

            $('#wednesday-start').blur();
            $('#wednesday-end').blur();

            $('#thursday-start').blur();
            $('#thursday-end').blur();

            $('#friday-start').blur();
            $('#friday-end').blur();

            $('#saturday-start').blur();
            $('#saturday-end').blur();

            $('#sunday-start').blur();
            $('#sunday-end').blur();
        });
        
    },

    'click #cancel-btn'(event) {
        $('#create-employee-form')[0].reset();
        validator.resetForm();        
    },

	'submit #create-employee-form'(event) {
		event.preventDefault();

		name = $('#employee-name').val()
		email = $('#employee-email').val();

        monStart = $('#monday-start').val();
        monEnd = $('#monday-end').val();

        tueStart = $('#tuesday-start').val();
        tueEnd = $('#tuesday-end').val();

        wedStart = $('#wednesday-start').val();
        wedEnd = $('#wednesday-end').val();

        thuStart = $('#thursday-start').val();
        thuEnd = $('#thursday-end').val();

        friStart = $('#friday-start').val();
        friEnd = $('#friday-end').val();

        satStart = $('#saturday-start').val();
        satEnd = $('#saturday-end').val();

        sunStart = $('#sunday-start').val();
        sunEnd = $('#sunday-end').val();
        
	},
});