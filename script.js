
// setting variables 

    var $;
    var apiKey = "b1b15e88fa797225412429c1c50c122a1";
    var city = '';
    var location = "";
    var forecast = "";
    var zip = "";
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&${apiKey}`;
    var userDate = "";

    console.log(queryUrl);
    
    // connecting AJAX request 
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
        
      console.log(response);
    });
    
    // $.ajax({
    //     type: 'POST',
    //     url: queryUrl,
    //     data: userInfo,
    //     success: function(show) {
    //         $order.append(`<li>name: ' + userInfo.date + </li>`)
    //     }


    // })
    // https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
