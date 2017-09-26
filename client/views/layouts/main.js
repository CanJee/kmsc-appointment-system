Template.mainLayout.rendered = function(){

    // Minimalize menu when screen is less than 768px
    $(window).bind("resize load", function () {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    });

    // Fix height of layout when resize, scroll and load
    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {

            var navbarHeigh = $('nav.navbar-default').height();
            var wrapperHeigh = $('#page-wrapper').height();

            if(navbarHeigh > wrapperHeigh){
                $('#page-wrapper').css("min-height", navbarHeigh + "px");
            }

            if(navbarHeigh < wrapperHeigh){
                $('#page-wrapper').css("min-height", $(window).height()  + "px");
            }

            if ($('body').hasClass('fixed-nav')) {
                if (navbarHeigh > wrapperHeigh) {
                    $('#page-wrapper').css("min-height", navbarHeigh + "px");
                } else {
                    $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
                }
            }
        }
    });


    // SKIN OPTIONS
    // Uncomment this if you want to have different skin option:
    // Available skin: (skin-1 or skin-3, skin-2 deprecated)
    // $('body').addClass('skin-1');

    // FIXED-SIDEBAR
    // Uncomment this if you want to have fixed left navigation
    // $('body').addClass('fixed-sidebar');
    // $('.sidebar-collapse').slimScroll({
    //     height: '100%',
    //     railOpacity: 0.9
    // });

    // BOXED LAYOUT
    // Uncomment this if you want to have boxed layout
    // $('body').addClass('boxed-layout');


};

jQuery.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" });

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("optdate", function(value, element) {
        return jQuery.validator.methods['date'].call(
            this,value,element
        )||value==("00/00/0000");
    }, "Please enter a valid date in format MM/DD/YYYY."
);

jQuery.validator.addMethod("time24", function(value, element) {
    return /^([01]?[0-9]|2[0-3])(:[0-5][0-9])$/.test(value);
}, "Invalid time format. Must be in 24 hour clock HH:MM format.");

// jQuery.validator.addMethod("optdate", function(value, element) {
//         return jQuery.validator.methods['date'].call(
//             this,value,element
//         )||value==("00/00/0000");
//     }, "Please enter a valid date in format MM/DD/YYYY."
// );

// jQuery.validator.addMethod("time24", function(value, element) {
//     return /^([01]?[0-9]|2[0-3])(:[0-5][0-9])$/.test(value);
// }, "Invalid time format. Must be in 24 hour clock HH:MM format.");

// $.validator.addMethod("departurearrivalnotsame", function(value, element) {
//    return $('#departure-location').val() != $('#arrival-location').val()
// }, "Departure and Arrival locations cannot be the same.");

// $.validator.addMethod("searchdeparturearrivalnotsame", function(value, element) {
//    return $('#search-departure-location').val() != $('#search-arrival-location').val()
// }, "Departure and Arrival locations cannot be the same.");
