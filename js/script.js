$(document).ready(function() {
        $("#submit").click(function(event) {
            event.preventDefault();
          var commentInput = $("input.comm").val();
          var emailInput=$("input#email").val();
          $("#comment").prepend('<li>'+'<b>' + emailInput + '</b>' + ': '+ commentInput + '</li>');
          alert('Your comment has been appreciated');

        });
      });
