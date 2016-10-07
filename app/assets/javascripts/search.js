$(function() {

  $(".search-form").on("submit", function(event) {
    event.preventDefault();
  });

  $(".search-setting").change(function() {
    if ($(this).val() === "update") {
      $("#status-container").removeClass("hide");
    } else if ($(this).val() === "find") {
      $("#status-container").addClass("hide");
    }
  });

  $(".search-field").on("keyup", function() {
    var searchField = $(this);
    var playerName = searchField.val();
    var url = $(".search-form").attr("action");
    var data = "search=" + playerName;

    if(playerName.length >= 3) {
      var request = $.ajax({
        url: url,
        method: "GET",
        data: data
      });

      request.done(function(response) {
        var fadeDelay = 0;
        $("#search-results").html("");

        if(response.length > 0) {
          $.each(response, function(index, player) {
            $("<li><a class='white' href='#" + player.id + "'>" + player.name + " " + player.position + " " + player.team + "</a></li>").hide().appendTo("#search-results").delay(fadeDelay).fadeIn(100);
            fadeDelay += 50;
          });
        } else {
          $("<li class='white'>No results found</li>").hide().appendTo("#search-results").fadeIn(100);
        }
      });
    } else {
      $("#search-results").html("");
    }
  });

});
