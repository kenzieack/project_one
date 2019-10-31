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
  console.log(media);

  // determine the genre dropdown menu based on media selected & initialize
  // materialize to accept new data-target
  if (media === "audiobooks") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-audiobooks");
    $('.dropdown-trigger').dropdown();
  }
  else if (media === "music") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-music");
    $('.dropdown-trigger').dropdown();
  }
  else if (media === "movies") {
    $("#genre-dropdown").attr("data-target", "dropdown-genre-movies");
    $('.dropdown-trigger').dropdown();
  }
}) // end of on-click event for media dropdown menu


// collect data clicked on genre and select search-by dropdown menu
function genreClick() {
  // collect the term clicked
  term = event.target.id;
  console.log(term);
  // determine the search-by dropdown menu based on media selected & initialize
  // materialize to accept new data-target
  if (media === "audiobooks") {
    $("#search-by-dropdown").attr("data-target", "dropdown-by-audiobooks");
    $('.dropdown-trigger').dropdown();
  }
  else if (media === "music") {
    $("#search-by-dropdown").attr("data-target", "dropdown-by-music");
    $('.dropdown-trigger').dropdown();
  }
  else if (media === "movies") {
    $("#search-by-dropdown").attr("data-target", "dropdown-by-movies");
    $('.dropdown-trigger').dropdown();
  }
}

// on-click events for genre dropdown menu
$("#dropdown-genre-audiobooks").on("click", function () {
  genreClick();
})
$("#dropdown-genre-music").on("click", function () {
  genreClick();
})
$("#dropdown-genre-movies").on("click", function () {
  genreClick();
})


// collect data clicked on search-by and create search string
function searchByClick (){
  entity = event.target.id;
  console.log(entity);
  search = "term=" + term + "&media=" + media + "&entity=" + entity;
  console.log(search);
}


// on-click events for search-by dropdown menu
$("#dropdown-by-music").on("click", function () {
  searchByClick();
})
$("#dropdown-by-audiobooks").on("click", function () {
  searchByClick();
})
$("#dropdown-by-movies").on("click", function () {
  searchByClick();
})

