import { Meteor } from 'meteor/meteor';

Template.member.rendered = function(){
	$("[data-toggle=tooltip]").tooltip({
    	container: 'body',
	});
};