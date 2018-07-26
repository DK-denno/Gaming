$(document).ready(function() {
        $("#submit").click(function(event) {
            event.preventDefault();
          var commentInput = $("input.comm").val();
          $("#comment").prepend('<li>'+ commentInput + '</li>');
          alert('Your comment has been appreciated');

        });
      });
