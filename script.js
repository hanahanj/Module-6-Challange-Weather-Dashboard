
var geocodeapi="http://api.openweathermap.org/geo/1.0/direct?q="
var city = "London";
var weatherapi="api.openweathermap.org/data/3.0/onecall?";
var units="&units=imperial";
var APIkey="&appid=3d0c40b4d046ace56881f7b12ca49b61";

var geocodeAPICall = geocodeapi+city+APIkey;
console.log(geocodeAPICall);




 // Make API call when the button is clicked
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
    

 } else{
     console.error("no city data found");
 }

 })
 .catch(error => {
   // Handle any errors that occur during the fetch operation
   console.error("There was a problem with the fetch operation:", error);
 });


 

//  fetch(weatherAPICall)
//  .then(response => {
//    // Check if the response is successful
//    if (!response.ok) {
//      throw new Error("Network response was not ok");
//    }
//    // Parse the response as JSON
//    return response.json();
//  })
//  .then(data => {
//    // Handle the data from the API response
//    console.log("API response:", data);
//    // Perform any further actions with the data

//    if(data != null){

//      var lat = data[0].lat;
//      console.log("Latitute = " + lat);
//      var long = data[0].lon;
//      console.log("Longitute = " + long);
    

//  } else{
//      console.error("no city data found");
//  }

//  })
//  .catch(error => {
//    // Handle any errors that occur during the fetch operation
//    console.error("There was a problem with the fetch operation:", error);
//  });


 

