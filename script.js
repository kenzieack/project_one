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
    } else if (media === "movies" && moviesSearchBy === "movieArtist") {
        for (i = 0; i < topValues[1].length; i++) {
            var author = topValues[1][i].artistName;
            console.log(author);
            searchForNYT.push(author);
            console.log(searchForNYT);
        }
    } else if (media === "movies" && moviesSearchBy === "movie") {
        for (i = 0; i < topValues[1].length; i++) {
            var author = topValues[1][i].trackName;
            console.log(author);
            searchForNYT.push(author);
            console.log(searchForNYT);
        }
    }
    NYTresponse1();
    NYTresponse2();
    NYTresponse3();
    NYTresponse4();
    NYTresponse5();
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
        topValues = Object.values(topResults);

        iTunesResults();
    });
    // NYTresponse();
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
    } else if (media === "music") {
        $("#genre-dropdown").attr("data-target", "dropdown-genre-music");
        $('.dropdown-trigger').dropdown();
    } else if (media === "movies") {
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
    } else if (media === "music") {
        $("#search-by-dropdown").attr("data-target", "dropdown-by-music");
        $('.dropdown-trigger').dropdown();
    } else if (media === "movies") {
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
// 


// 
// *** NYT API ***
// 
var apiKey = "C3dkR8GWRlTGbLGqtwwnOCS620BU58vY";
var limit = 5
var queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&api-key=${apiKey}`;
var searchForNYTAPI = "";
var articleArray1 = [];
var articleArray2 = [];
var articleArray3 = [];
var articleArray4 = [];
var articleArray5 = [];


function NYTresponse1() {
    searchForNYTAPI = searchForNYT.slice(0, 1);
    console.log(searchForNYTAPI);

    // Ajax call for connecting NYT API
    $.ajax({
        url: queryUrlNYT,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (j = 0; j < limit; j++) {

            var article = response.response.docs[j];
            console.log(response.response.docs[j]);

            var articleObj = {
                author: article.byline.original,
                title: article.headline.main,
                url: article.web_url
            };
            articleArray1.push(articleObj);
        }
    })
    console.log(articleArray1);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE




    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse2() {
    searchForNYTAPI = searchForNYT.slice(1, 2);
    console.log(searchForNYTAPI);

    // Ajax call for connecting NYT API
    $.ajax({
        url: queryUrlNYT,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (j = 0; j < limit; j++) {

            var article = response.response.docs[j];
            console.log(response.response.docs[j]);

            var articleObj = {
                author: article.byline.original,
                title: article.headline.main,
                url: article.web_url
            };
            articleArray2.push(articleObj);
        }
    })
    console.log(articleArray2);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE




    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse3() {
    searchForNYTAPI = searchForNYT.slice(2, 3);
    console.log(searchForNYTAPI);

    // Ajax call for connecting NYT API
    $.ajax({
        url: queryUrlNYT,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (j = 0; j < limit; j++) {

            var article = response.response.docs[j];
            console.log(response.response.docs[j]);

            var articleObj = {
                author: article.byline.original,
                title: article.headline.main,
                url: article.web_url
            };
            articleArray3.push(articleObj);
        }
    })
    console.log(articleArray3);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE




    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse4() {
    searchForNYTAPI = searchForNYT.slice(3, 4);
    console.log(searchForNYTAPI);

    // Ajax call for connecting NYT API
    $.ajax({
        url: queryUrlNYT,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (j = 0; j < limit; j++) {

            var article = response.response.docs[j];
            console.log(response.response.docs[j]);

            var articleObj = {
                author: article.byline.original,
                title: article.headline.main,
                url: article.web_url
            };
            articleArray4.push(articleObj);
        }
    })
    console.log(articleArray4);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE




    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse5() {
    searchForNYTAPI = searchForNYT.slice(4, 5);
    console.log(searchForNYTAPI);

    // Ajax call for connecting NYT API
    $.ajax({
        url: queryUrlNYT,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (j = 0; j < limit; j++) {

            var article = response.response.docs[j];
            console.log(response.response.docs[j]);

            var articleObj = {
                author: article.byline.original,
                title: article.headline.main,
                url: article.web_url
            };
            articleArray5.push(articleObj);
        }
    })
    console.log(articleArray5);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE




    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}


// function to dynamically generate the results needs to go here!!!
function finalResults(){

}
















// // **** INGRID'S OLD DRAFT - DO NOT DELETE!!!!
// // function to call NYT API once all info from iTunes has been collected
// // function is being called inside iTunesResults()
// function NYTresponse() {
//     // for (var i = 0; i < limit; i++) {
//     //     searchForNYTAPI = searchForNYT.slice(i, i+1);
//     //     console.log(searchForNYTAPI);


//             searchForNYTAPI = searchForNYT.slice(0, 1);
//             console.log(searchForNYTAPI);

//         // Ajax call for connecting NYT API
//         $.ajax({
//             url: queryUrlNYT,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             for (j = 0; j < limit; j++) {

//                 var article = response.response.docs[j];
//                 console.log(response.response.docs[j]);

//                 var articleObj = {
//                     author: article.byline.original,

//                     title: article.headline.main,

//                     url: article.web_url

//                 };
//                 // `articleArray${i+1}`.push(articleObj);
//                 articleArray1.push(articleObj);


//             }
//         })
//         // console.log(`articleArray${i+1}`);
//         console.log(articleArray1);

//     // }

//     // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE

//     // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
//     // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
//     // $("#results").removeAttr("class", "no-display");
// }





// ******** MACKENZIE'S CODE - DO NOT DELETE!!!
// // 
// // *** NYT API ***
// // 
// var apiKey = "C3dkR8GWRlTGbLGqtwwnOCS620BU58vY";
// var limit = 5
// var queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYT}&api-key=${apiKey}`;
// var articleArray = [];

// // function to call NYT API once all info from iTunes has been collected
// // function is being called inside iTunesResults()
// function NYTresponse() {
//     // Ajax call for connecting NYT API
//     $.ajax({
//         url: queryUrlNYT,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         for (i = 0; i < limit; i++) {

//             var article = response.response.docs[i];
//             console.log(response.response.docs[i]);

//             var articleObj = {
//                 author: article.byline.original,

//                 title: article.headline.main,

//                 url: article.web_url

//             };
//             articleArray.push(articleObj);

//         }
//     })
//     console.log(articleArray);

//     // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE





//     // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
//     // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
//     $("#results").removeAttr("class", "no-display");

// }