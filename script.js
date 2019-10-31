// initializing dropdown
$('.dropdown-trigger').dropdown();


var queryUrl = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicTrack"

// "https://itunes.apple.com/search?key1=value1&key2=value2&key3=value3"



// connecting AJAX request 
$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function (response) {

  var topResults = JSON.parse(response);
  console.log(topResults);
  var topValues = Object.values(topResults);
  console.log(topValues[1][2].artistName);

});
