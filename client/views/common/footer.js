Template.footer.rendered = function () {

    // FIXED FOOTER
    // Uncomment this if you want to have fixed footer or add 'fixed' class to footer element in html code
    // $('.footer').addClass('fixed');

    Meteor.autorun(function () {
        var stat;
        if (Meteor.status().status === "connected") {
            stat = 'green'
        }
        else if (Meteor.status().status === "connecting") {
            stat = 'yellow'
        }
        else {
          stat = 'red'
          swal({
            html:true,
            title: "Error",
            text: `Server connection has been lost!`,
            type: "error",
          });
        }
        Session.set('status',stat);
    });

};

Template.footer.helpers({
  green() {
    return Session.get("status") === 'green';
  },
  yellow() {
    return Session.get("status") === 'yellow';
  },
  red() {
    return Session.get("status") === 'red';
  }
});
