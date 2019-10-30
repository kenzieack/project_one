// initializing dropdown
$('.dropdown-trigger').dropdown();



var queryUrl = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=hip-hop/rap&media=music&entity=musicArtist"

// "https://itunes.apple.com/search?key1=value1&key2=value2&key3=value3"

// https://itunes.apple.com/search?term=0&primaryGenreId=18&media=music&entity=musicArtist
// key1=value1&key2=value2&key3=value3

    // // connecting AJAX request 
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
        
      console.log(JSON.parse(response));
    });
  