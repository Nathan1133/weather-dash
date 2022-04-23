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