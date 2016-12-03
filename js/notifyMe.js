/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
(function(e) {
    e.fn.notifyMe = function(t) {
        var r = e(this);
        var nameInput = e(this).find("input[name=name]");
        var emailInput = e(this).find("input[name=email]");
        var messageInput= e(this).find("input[name=message]");
        var o = e(this).find(".note");
        e(this).on("submit", function(t) {
            t.preventDefault();
            var nameVal = nameInput.val();
            var emailVal = emailInput.val();
            var messageVal = messageInput.val();
            var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (p.test(emailVal)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
                o.show();
                e.ajax({
                    type: "POST",
                    url: "https://formspree.io/kkarich@yahoo.com",
                    data: {
                        name: nameVal,
                        email: emailVal,
                        message:messageVal
                    },
                    dataType: "json",
                    error: function(e) {
                        
                        o.hide();
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                        if (e.status == 404) {
                            $(".message").html('<p class="notify-valid">Service is not available at the moment.<br>Please check your internet connection or try again later.</p>').fadeIn();
                        } else {
                            $(".message").html('<p class="notify-valid">Oops. Looks like something went wrong.<br>Please try again later.</p>').fadeIn();
                        }
                    }
                }).done(function(e) {
                    console.log("test", e)
                    o.hide();
                    if (e.success) {
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".message").removeClass("bad-email").addClass("success-full");
                        $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
                        $(".message").html('<p class="notify-valid">Thank you! Your email was sent.<br>We will get in touch with you shortly</p>').fadeIn();
                    } else {
                        if (e.type == "ValidationError") {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">This email address looks fake or invalid.<br>Please enter a real email address.</p>').fadeIn();
                        } else {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">Oops. Looks like something went wrong.<br>Please try again later.</p>').fadeIn();
                        }
                    }
                })
            } else {
                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html('<p class="notify-valid">Your e-mail address is incorrect.<br>Please check it and try again.</p>').fadeIn();
                o.hide();
            }

            // Reset and hide all messages on .keyup()
            $("#notifyMe input").keyup(function() {
                $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
                $(".message").fadeOut();
            });
        })
    }

    

})(jQuery)