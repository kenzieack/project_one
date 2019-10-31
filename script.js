// initializing dropdown
$('.dropdown-trigger').dropdown();


// iTunes API
var queryUrl = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicTrack"

// var queryUrl = "https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicTrack"

var media = "";
var term = "";
var entity = "";
var search = ""; 

// "https://itunes.apple.com/search?key1=value1&key2=value2&key3=value3"



// connecting AJAX request to iTunes API
$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function (response) {

  var topResults = JSON.parse(response);
  console.log(topResults);
  var topValues = Object.values(topResults);
  console.log(topValues[1][2].artistName);

});


// on-click event for media dropdown menu
$("#dropdown-media").on("click", function () {
  media = event.target.id;
  search = "term=" + term + "&media=" + media + "&entity=" + entity;
  console.log(media);
  console.log(search);

  console.log(media === "audiobooks");

    // determine the genre dropdown menu based on media selected
  if (media === "audiobooks") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-audiobooks");
    $("#search-by-dropdown").attr("data-target", "dropdown-by-audiobooks");

    $('.dropdown-trigger').dropdown();
  }
  else if (media === "music") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-music");
    $("#search-by-dropdown").attr("data-target", "dropdown-by-music");
    $('.dropdown-trigger').dropdown();

  }
  else if (media === "movies") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-movies");
    $("#search-by-dropdown").attr("data-target", "dropdown-by-movies");
    $('.dropdown-trigger').dropdown();

  }

  // determine the Search-By dropdown menu based on media selected


// make sure this clears when search is done
// $(".default-genre").attr("id", "dropdown-genre-default")


}) // end of on-click event for media dropdown menu

$("body").on("click","#genre-dropdown",function() {
  // do some magic with $(this) element
  console.log("butts");
});