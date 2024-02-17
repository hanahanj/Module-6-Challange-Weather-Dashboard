
var geocodeapi="http://api.openweathermap.org/geo/1.0/direct?q="
var weatherapi="api.openweathermap.org/data/3.0/onecall?";
var units="&units=imperial";
var APIkey="&appid=3d0c40b4d046ace56881f7b12ca49b61";
var cityInput = "";

locationSubmit.addEventListener("click", saveData);


function saveData(event) {
    event.preventDefault()
   
    // Get the input value
    var cityInput = document.getElementById("location").value;

    // Perform any validation or processing if needed

    // Save the data as a JavaScript variable
    var savedCity = cityInput;

    // Display a confirmation or perform any other action
    console.log("Data saved: " + savedCity);

    var geocodeAPICall = geocodeapi+cityInput+APIkey;
    console.log(geocodeAPICall);
    if (cityInput != null){
        fetch(geocodeAPICall)
         .then(response => {
           // Check if the response is successful
           if (!response.ok) {
             throw new Error("Network response was not ok");
           }
           // Parse the response as JSON
           return response.json();
         })
         .then(data => {
           // Handle the data from the API response
           console.log("GeoCode response:", data);
           // Perform any further actions with the data
        
           if(data != null){
        
        //    convert geolocation call to lat/lon and call weather api
            lat = data[0].lat;
            console.log("Latitute = " + lat);
            long = data[0].lon;
            console.log("Longitute = " + long);
            cityLat = "lat="+lat;
            console.log("city lat = " + cityLat);
            cityLong = "&lon="+long;
            weatherAPICall = "https://" +weatherapi+cityLat+cityLong+units+APIkey;
            console.log("weather API Call: " + weatherAPICall);

            // Set location to title
            currentLoc = savedCity;
            curLoc = document.getElementById("currentLocation");
            curLoc.innerHTML = currentLoc;
            
            // Get Current Weather
            

            // getCurrentWeather(data);
            

        getWeather(weatherAPICall);
            
         } else{
             console.error("no city data found");
         }
        
         })
         .catch(error => {
           // Handle any errors that occur during the fetch operation
           console.error("There was a problem with the fetch operation:", error);
         });
        };  


        // Function to add item to localStorage and display all items
    function addItem() {
    var inputField = document.getElementById('location');
    var item = inputField.value.trim(); // Trim whitespace
    if (item !== '') { // Only proceed if the input is not empty
        var items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
        inputField.value = ''; // Clear input field
    }
}

function displayItems() {
    var itemButtons = document.getElementById('itemButtons');
    itemButtons.innerHTML = ''; // Clear previous item buttons
    var items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.forEach(function(item) {
        var button = document.createElement('button');
        button.textContent = item;
        button.classList.add("btn", "btn-secondary", "m-1");
         
        // when click on a past location button, add it to the location input and display the weather
        button.addEventListener('click', function() {
            document.getElementById('location').value = item; 

            saveData(event);
        });
        itemButtons.appendChild(button);
    });
}
addItem();
displayItems();
};


   
function getWeather(weatherAPICall) {
     fetch(weatherAPICall)
             .then(response => {
               // Check if the response is successful
               if (!response.ok) {
                 throw new Error("Network response was not ok");
               }
               // Parse the response as JSON
               return response.json();
             })
             .then(data => {
               // Handle the data from the API response
               console.log("Weather response:", data);
               // Perform any further actions with the data
            
               if(data != null){
                // get all current data from api
                // get current unix date data
                currentDateUNIX = data.current.dt;
                 // convert UNIX to normal
                currentDate = dayjs.unix(currentDateUNIX).format('MMM D, YYYY');
                
                console.log("location " + currentLoc);
                currentTemp = data.current.temp;
                currentWind = data.current.wind_speed;
                currentHum = data.current.humidity;
                currentIcon = data.current.weather[0].icon;

                currentIconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    
                curIcon = document.getElementById("icon");
                curDay = document.getElementById("currentDay");
                curTemp = document.getElementById("currentTemp");
                curWind = document.getElementById("currentWind");
                curHum = document.getElementById("currentHum");

                curDay.innerHTML = currentDate;
                curTemp.innerHTML = "Temperature: " + currentTemp + "&#8457";
                curWind.innerHTML = "Wind: " + currentWind + " MPH";
                curHum.innerHTML = "Humidity: " + currentHum + "%";
                curIcon.src = currentIconUrl;


                for (i=1; i<6; i++){
                    forDateUNIX = data.daily[i].dt;
                    forDate = dayjs.unix(forDateUNIX).format('MMM D, YYYY');
                    forTemp = data.daily[i].temp.day;
                    forWind = data.daily[i].wind_speed;
                    forHum = data.daily[i].humidity;
                    forIcon = data.daily[i].weather[0].icon;
                    forIconUrl = "http://openweathermap.org/img/w/" + forIcon + ".png";

                    if (i==1){
                        icon = document.getElementById("day1icon");
                        day = document.getElementById("day1Day");
                        temp = document.getElementById("day1Temp");
                        wind = document.getElementById("day1Wind");
                        hum = document.getElementById("day1Hum");
                        icon.src = forIconUrl;
        
                        day.innerHTML = forDate;
                        temp.innerHTML = "Temperature: " + forTemp + "&#8457";
                        wind.innerHTML = "Wind: " + forWind + " MPH";
                        hum.innerHTML = "Humidity: " + forHum + "%";
                        icon.src = forIconUrl;


                    }else if (i==2){
                        icon = document.getElementById("day2icon");
                        day = document.getElementById("day2Day");
                        temp = document.getElementById("day2Temp");
                        wind = document.getElementById("day2Wind");
                        hum = document.getElementById("day2Hum");
                        icon.src = forIconUrl;
        
                        day.innerHTML = forDate;
                        temp.innerHTML = "Temperature: " + forTemp + "&#8457";
                        wind.innerHTML = "Wind: " + forWind + " MPH";
                        hum.innerHTML = "Humidity: " + forHum + "%";
                        icon.src = forIconUrl;


                    } else if (i==3){
                        icon = document.getElementById("day3icon");
                        day = document.getElementById("day3Day");
                        temp = document.getElementById("day3Temp");
                        wind = document.getElementById("day3Wind");
                        hum = document.getElementById("day3Hum");
                        icon.src = forIconUrl;
        
                        day.innerHTML = forDate;
                        temp.innerHTML = "Temperature: " + forTemp + "&#8457";
                        wind.innerHTML = "Wind: " + forWind + " MPH";
                        hum.innerHTML = "Humidity: " + forHum + "%";
                        icon.src = forIconUrl;

                    } else if (i==4){
                        icon = document.getElementById("day4icon");
                        day = document.getElementById("day4Day");
                        temp = document.getElementById("day4Temp");
                        wind = document.getElementById("day4Wind");
                        hum = document.getElementById("day4Hum");
                        icon.src = forIconUrl;
        
                        day.innerHTML = forDate;
                        temp.innerHTML = "Temperature: " + forTemp + "&#8457";
                        wind.innerHTML = "Wind: " + forWind + " MPH";
                        hum.innerHTML = "Humidity: " + forHum + "%";
                        icon.src = forIconUrl;

                    } else {
                        icon = document.getElementById("day5icon");
                        day = document.getElementById("day5Day");
                        temp = document.getElementById("day5Temp");
                        wind = document.getElementById("day5Wind");
                        hum = document.getElementById("day5Hum");
                        icon.src = forIconUrl;
        
                        day.innerHTML = forDate;
                        temp.innerHTML = "Temperature: " + forTemp + "&#8457";
                        wind.innerHTML = "Wind: " + forWind + " MPH";
                        hum.innerHTML = "Humidity: " + forHum + "%";
                        icon.src = forIconUrl;

                    };     
                };
            } else{
                 console.error("no city data found");
             }
            
             })
             .catch(error => {
               // Handle any errors that occur during the fetch operation
               console.error("There was a problem with the fetch operation:", error);
             });
};






