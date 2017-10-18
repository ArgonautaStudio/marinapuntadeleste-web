$(document).ready(function () {

    function responsiveImages() {
        var DeviceWidth = window.innerWidth;
        if (DeviceWidth <= 414) {
            $('#carousel1').attr('src', 'assets/images/Movil_Img_Seccion1_01.jpg');
            $('#carousel2').attr('src', 'assets/images/Movil_Img_Seccion1_02.jpg');
            $('#carousel3').attr('src', 'assets/images/Movil_Img_Seccion1_03.jpg');
            $('#carousel4').attr('src', 'assets/images/Movil_Img_Seccion1_04.jpg');
            $('#carousel5').attr('src', 'assets/images/Movil_Img_Seccion1_05.jpg');
        } else {
            $('#carousel1').attr('src', 'assets/images/Seccion1_06.jpg');
            $('#carousel2').attr('src', 'assets/images/Seccion1_01.jpg');
            $('#carousel3').attr('src', 'assets/images/Seccion1_04.jpg');
            $('#carousel4').attr('src', 'assets/images/Seccion1_02.jpg');
            $('#carousel5').attr('src', 'assets/images/Seccion1_03.jpg');
        }
    };


    $(window).resize(function () {
        responsiveImages();
    });

    responsiveImages();

    $('.carousel').carousel({
        interval: 3000
    })

    $('#contactForm').bootstrapValidator({
        message: "Invalid",
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "This field is required"
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: "This field is required"
                    },
                    emailAddress: {
                        message: "This field must contain a valid email address"
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: "This field is required"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        $.post($form.attr('action'), $form.serialize(), function (result) {
            document.getElementById("contactForm").reset();
            if (!result.error) {
                $('.submit-success').fadeIn();
                setTimeout(function () {
                    $('.submit-success').fadeOut();
                }, 2000)
            } else {
                $('.submit-error').fadeIn();
                setTimeout(function () {
                    $('.submit-error').fadeOut();
                }, 2000)
            }

        }, 'json');
    });

    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });
});


smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: null,
    speed: 800,
    easing: 'easeInOutCubic',
    offset: 0
});