// initializing dropdown
$('.dropdown-trigger').dropdown();


// iTunes API
var queryUrl = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicTrack"

// var queryUrl = "https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicTrack"

var media = "";
var term = "";
var entity = "";
var search = term + "&" + media + "&" + entity

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
  media = "media=" + event.target.id;

  console.log(media);
  console.log(search);


}) // end of on-click event for media dropdown menu