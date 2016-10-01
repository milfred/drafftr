$(function() {

  $(".search-form").on("submit", function(event) {
    event.preventDefault();
  });

  $(".search-field").on("keyup", function() {
    var searchField = $(this);
    var playerName = searchField.val();
    var url = $(".search-form").attr("action");
    var data = "search=" + playerName;
    var setting = $(".search-setting").val();
    console.log(url);

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
            $("<li><a href='#" + player.id + "'>" + player.name + " " + player.position + " " + player.team + "</a></li>").hide().appendTo("#search-results").delay(fadeDelay).fadeIn(100);
            fadeDelay += 50;
          });
        } else {
          $("<li>No Results Found</li>").hide().appendTo("#search-results").fadeIn(100);
        }
      });
    } else {
      $("#search-results").html("");
    }
  });

});
