$(document).ready(function () {
  $("#send_message").click(function (e) {
    //Stop form submission & check the validation
    e.preventDefault();

    // Variable declaration
    var error = false;
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    $("#name,#email,#phone,#message").click(function () {
      $(this).removeClass("error_input");
    });

    // Form field validation
    if (name.length == 0) {
      error = true;
      $("#name").addClass("error_input");
    } else {
      $("#name").removeClass("error_input");
    }
    if (email.length == 0 || email.indexOf("@") == "-1") {
      error = true;
      $("#email").addClass("error_input");
    } else {
      $("#email").removeClass("error_input");
    }
    if (phone.length == 0) {
      error = true;
      $("#phone").addClass("error_input");
    } else {
      $("#phone").removeClass("error_input");
    }
    if (message.length == 0) {
      error = true;
      $("#message").addClass("error_input");
    } else {
      $("#message").removeClass("error_input");
    }

    // If there is no validation error, next to process the mail function
    if (error == false) {
      // Disable submit button just after the form processed 1st time successfully.
      $("#send_message").attr({ disabled: "true", value: "Sending..." });

      /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
      $.post(
        "https://formspree.io/f/xleqbyqz",
        $("#contactForm").serialize(),
        function (result) {
          //Check the result set from Formspree.
          if (result.indexOf("Thank you for your submission!") != -1) {
            //If the submission is successful, hide the form and display the success message
            $("#contactForm").hide();
            $("#mail_success").fadeIn(500);
          } else {
            //Display the error message
            $("#mail_fail").fadeIn(500);
            // Enable the submit button again
            $("#send_message")
              .removeAttr("disabled")
              .attr("value", "Submit Form");
          }
        }
      );
    }
  });
});