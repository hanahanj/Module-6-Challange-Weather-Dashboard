
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
           console.log("API response:", data);
           // Perform any further actions with the data
        
           if(data != null){
        
            lat = data[0].lat;
            console.log("Latitute = " + lat);
            long = data[0].lon;
            console.log("Longitute = " + long);
            cityLat = "lat="+lat;
            console.log("city lat = " + cityLat);
            cityLong = "&lon="+long;
            weatherAPICall = weatherapi+cityLat+cityLong+units+APIkey;
            console.log("weather API Call: " + weatherAPICall);
            alert("weather API Call: " + weatherAPICall);
        
         } else{
             console.error("no city data found");
         }
        
         })
         .catch(error => {
           // Handle any errors that occur during the fetch operation
           console.error("There was a problem with the fetch operation:", error);
         });
        
         
        
        };

       

};


// Make API call when the button is clicked



 

