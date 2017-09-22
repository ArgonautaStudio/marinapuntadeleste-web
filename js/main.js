$(document).ready(function () {

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

});