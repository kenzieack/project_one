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
    // console.log();
    if (media === "audiobooks" || media === "music") {
        for (i = 0; i < topValues[1].length; i++) {
            var author = topValues[1][i].artistName;
            // console.log(author);
            searchForNYT.push(author);
            // console.log(searchForNYT);
        }
    } else if (media === "movies" && moviesSearchBy === "movieArtist") {
        for (i = 0; i < topValues[1].length; i++) {
            var author = topValues[1][i].artistName;
            // console.log(author);
            searchForNYT.push(author);
            // console.log(searchForNYT);
        }
    } else if (media === "movies" && moviesSearchBy === "movie") {
        for (i = 0; i < topValues[1].length; i++) {
            var author = topValues[1][i].trackName;
            // console.log(author);
            searchForNYT.push(author);
            // console.log(searchForNYT);
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
    queryUrl = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?" + search
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        topResults = JSON.parse(response);
        topValues = Object.values(topResults);
        console.log(topValues);

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
var limit = 3;
var queryUrlNYT;
var searchForNYTAPI = "";
var articleArray1 = [];
var articleArray2 = [];
var articleArray3 = [];
var articleArray4 = [];
var articleArray5 = [];


function NYTresponse1() {
    searchForNYTAPI = searchForNYT.slice(0, 1);
    console.log(searchForNYTAPI);
    queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&fq=headline:${searchForNYTAPI}&api-key=${apiKey}`;
    console.log(queryUrlNYT);

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
        $("#heading1").text(searchForNYT[0]);
        $("#head1art0").text(articleArray1[0].title)
        $("#head1art1").text(articleArray1[1].title)
        $("#head1art2").text(articleArray1[2].title)
        $("#head1art0").attr("href", articleArray1[0].url);
        $("#head1art1").attr("href", articleArray1[1].url);
        $("#head1art2").attr("href", articleArray1[2].url);
    })
    console.log(articleArray1);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE
    // finalResults1();



    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse2() {
    searchForNYTAPI = searchForNYT.slice(1, 2);
    console.log(searchForNYTAPI);
    queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&headline:${searchForNYTAPI}&api-key=${apiKey}`;
    console.log(queryUrlNYT);

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
        console.log(articleArray2)
        console.log(articleArray2[0]);
        console.log(articleArray2[0].title);

        $("#heading2").text(searchForNYT[1]);
        $("#head2art0").text(articleArray2[0].title)
        $("#head2art1").text(articleArray2[1].title)
        $("#head2art2").text(articleArray2[2].title)
        $("#head2art0").attr("href", articleArray2[0].url);
        $("#head2art1").attr("href", articleArray2[1].url);
        $("#head2art2").attr("href", articleArray2[2].url);


        // // $(`#head2art${j}`).text(`articleArray2[${j}].title`);
        // // $(`#head2art${j}`).attr("href", `articleArray2[${j}].url`);
        // // }


        // return articleArray2;
    })

    console.log(articleArray2[0]);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE
    // finalResults2();



    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse3() {
    searchForNYTAPI = searchForNYT.slice(2, 3);
    console.log(searchForNYTAPI);
    queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&headline:${searchForNYTAPI}&api-key=${apiKey}`;
    console.log(queryUrlNYT);

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
        $("#heading3").text(searchForNYT[2]);
        $("#head3art0").text(articleArray3[0].title)
        $("#head3art1").text(articleArray3[1].title)
        $("#head3art2").text(articleArray3[2].title)
        $("#head3art0").attr("href", articleArray3[0].url);
        $("#head3art1").attr("href", articleArray3[1].url);
        $("#head3art2").attr("href", articleArray3[2].url);
    })
    console.log(articleArray3);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE
    // finalResults3();



    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse4() {
    searchForNYTAPI = searchForNYT.slice(3, 4);
    console.log(searchForNYTAPI);
    queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&headline:${searchForNYTAPI}&api-key=${apiKey}`;
    console.log(queryUrlNYT);

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
        $("#heading4").text(searchForNYT[3]);
        $("#head4art0").text(articleArray4[0].title)
        $("#head4art1").text(articleArray4[1].title)
        $("#head4art2").text(articleArray4[2].title)
        $("#head4art0").attr("href", articleArray4[0].url);
        $("#head4art1").attr("href", articleArray4[1].url);
        $("#head4art2").attr("href", articleArray4[2].url);
    })
    console.log(articleArray4);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE
    // finalResults4();



    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}

function NYTresponse5() {
    searchForNYTAPI = searchForNYT.slice(4, 5);
    console.log(searchForNYTAPI);
    queryUrlNYT = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForNYTAPI}&headline:${searchForNYTAPI}&api-key=${apiKey}`;
    console.log(queryUrlNYT);

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
        $("#heading5").text(searchForNYT[4]);
        $("#head5art0").text(articleArray5[0].title)
        $("#head5art1").text(articleArray5[1].title)
        $("#head5art2").text(articleArray5[2].title)
        $("#head5art0").attr("href", articleArray5[0].url);
        $("#head5art1").attr("href", articleArray5[1].url);
        $("#head5art2").attr("href", articleArray5[2].url);
    })
    console.log("this is article 5" + articleArray5);

    // CODE TO DYNAMICALLY POPULATE THE RESULTS SHOULD BE GENERATED HERE
    // finalResults5();



    // AFTER THE RESULTS HAS CHANGED TO INCORPORATE THE RIGHT INFORMATION
    // THEN THIS LINE WILL RUN TO DISPLAY THE RESULTS SECTION
    // $("#results").removeAttr("class", "no-display");
}


// function to dynamically generate the results
function finalResults1() {
    $("#heading1").text(searchForNYT[0]);
    // for (i = 1; i < 6; i++) {
    //     $(`#heading${i}`).text(searchForNYT[i]);
    $("#head2art0").text(articleArray1[0].title);
    // $("#head2art0").attr("href", "articleArray1[0].url`);

    console.log(articleArray1);
    console.log(Object.keys(articleArray1))
    console.log(articleArray1[0]);

    // for (var j = 0; j < limit; j++) {
    //     console.log(`articleArray1[${j}]`);
    //     $(`#head1art${j}`).text(`articleArray1[${j}].title`);
    //     $(`#head1art${j}`).attr("href", `articleArray1[${j}].url`);

    // }
}







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