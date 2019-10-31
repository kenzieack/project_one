// initializing dropdown
$('.dropdown-trigger').dropdown();


//
// *** ITUNES API ***
//

// iTunes API search terms
var queryUrl;
var media = "";
var term = "";
var entity = "";
var search = "";

// iTunes API results that will be passed to NYT API
var topResults;
var topValues;
var searchForNYT = [];
var moviesSearchBy;


// create search array for NYT API
function iTunesResults() {
  console.log();
  if (media === "audiobooks" || media === "music") {
    for (i = 0; i < topValues[1].length; i++) {
      var author = topValues[1][i].artistName;
      console.log(author);
      searchForNYT.push(author);
      console.log(searchForNYT);
    }
  }
  else if (media === "movies" && moviesSearchBy === "movieArtist") {
    for (i = 0; i < topValues[1].length; i++) {
      var author = topValues[1][i].artistName;
      console.log(author);
      searchForNYT.push(author);
      console.log(searchForNYT);
    }
  }
  else if (media === "movies" && moviesSearchBy === "movie") {
    for (i = 0; i < topValues[1].length; i++) {
      var author = topValues[1][i].trackName;
      console.log(author);
      searchForNYT.push(author);
      console.log(searchForNYT);
    }
  }
}


// connecting AJAX request to iTunes API
function submit() {
  queryUrl = "https://itunes.apple.com/search?" + search
  console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {

    topResults = JSON.parse(response);
    console.log(topResults);
    topValues = Object.values(topResults);
    console.log(topValues[1][2].artistName);
    console.log(topValues[1].length);

    iTunesResults();
  });
}



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
function searchByClick() {
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
  moviesSearchBy = event.target.id;
  console.log(moviesSearchBy);
  searchByClick();
})

// on-click submit
$("#submit-btn").on("click", function () {
  console.log(search);
  submit();
})

// 
// *** END OF ITUNES API ***

// *** NYT API ***
var apiKey = "C3dkR8GWRlTGbLGqtwwnOCS620BU58vY";
var limit = 5
var queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYT}&api-key=${apiKey}`;
var articleArray = [];


// Ajax call for connecting NYT API
$.ajax({
  url: queryUrlNYT,
  method: "GET"
}).then(function (response) {
  for (i = 0; i < limit; i++) {
      
      var article = response.response.docs[i];
      //console.log(response.response.docs[i]);
    
      var articleObj =  {
        author: article.byline.original,

          title: article.headline.main,

              url : article.web_url

      };
      articleArray.push(articleObj);

