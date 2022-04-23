// Variables
var searchButton = $("#submit-button");
var form = $("#form");
var date = (".date");
var timeDateToday = moment().format('dddd, MMMM Do YYYY h:mm a').toString();
var citiesList = $(".featured-cities");
var forecastDay = $("#forecast-div");
var input = $("#form-input"); 
var searchedCities = [];

      // Function to create the recently searched cities list
      const generateList = function() {
        searchedCities = JSON.parse(localStorage.getItem("searchedCities"));  
        }

        else {
          localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
        }
      };

        // Call the function
        generateList();

        var createList = function() {
          citiesList.empty();
          for (i = 0; i < searchedCities.length; i++) {
            citiesList.append(
              `<li class="list-group-item searched-Cities" id="${searchedCities[i]}">${searchedCities[i]}</li>`
            );
          }
        };
        
        createList();

        //OnClick event for search button
        searchButton.on("click", function(event) {
            event.preventDefault();
            var cityName = input[0].value; 
            
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&uvi?&appid=95d304ea9130c998e905d74bc71292d7";
            
              // Performing an AJAX request with the queryURL
              $.ajax({
                url: queryURL,
                method: "GET",
                crossDomain: true,
                dataType: 'jsonp'
              })
                // After data comes back from the request
                .then(function(response) {
                var cityWeather = JSON.stringify(response);    
        
                var iconCode = response.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
        
                // Append results
                $(".city-name").html(response.name + " Weather Details:");
                $(".date").html(timeDateToday);
                $(".conditions").html("Conditions: " + response.weather[0].main + "<img id='weather-icon' src='" + iconURL + "' alt='Weather icon'>");
                $(".wind").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".temp-C").html("Temperature (°C): " + response.main.temp);
                });
        
                // Get item from local storate
              var citiesTemp = JSON.parse(localStorage.getItem("searchedCities"));
              citiesTemp.push(cityName);
                // Set item to local storage
              localStorage.setItem("searchedCities", JSON.stringify(citiesTemp));
              // Call the functions
              generateList();
              createList();
        
          });

            // OnClick event for city buttons
  $(".featured-cities").on("click", function(event) {
    event.preventDefault();
    var cityText = $(event.target).attr("id");  
    
   
    var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q="+cityText+"&units=metric&uvi?&appid=95d304ea9130c998e905d74bc71292d7";
      
      // Performing an AJAX request with the queryURL2
      $.ajax({
        url: queryURL2,
        method: "GET",
        crossDomain: true,
        dataType: 'jsonp'
      })

        // After data comes back from the request
        .then(function(response) {
        var cityWeather = JSON.stringify(response);
            
            var iconCode = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

        // Append results
        $(".city-name").html(response.name + " Weather Details:");
        $(".date").html(timeDateToday);
        $(".conditions").html("Conditions: " + response.weather[0].main + "<img id='weather-icon' src='" + iconURL + "' alt='Weather icon'>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp-C").html("Temperature (°C): " + response.main.temp);
        });

        generateList();

    });