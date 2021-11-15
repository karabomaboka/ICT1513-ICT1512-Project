// directions.js

"use strict";

// global variables
var waitForUser;
var destinationLat = "-28.4616821851338";   // school latitude
var destinationLong =  "30.19236391846591";  // school longitude

// perform setup tasks when page first loads
function setUpDirections() {
   document.getElementById("directions").addEventListener("click", loadDirections, false);
}

// wait for the user to allow geolocaton
// if user accepts show directions on Google maps
function loadDirections(string) {
    waitForUser = setTimeout(fail, 10000);

    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});
    } else {
      fail();
   }
}

// get the user's current location, and open a new tab
function createDirections(position) {
    clearTimeout(waitForUser);
   
    var currentLocation = position.coords.latitude + "," + position.coords.longitude; // user coordinates
    var destinationLocation = destinationLat + "," + destinationLong; // school coordinates

    window.open("https://www.google.com/maps/dir/?api=1&origin=" + currentLocation + 
  						"&destination=" + destinationLocation +"&travelmode=driving", "_blank");   // open google maps a new window
}

function fail() {
   alert("Unable to access your current location.");
}

// run setUpDirections() function when page finishes loading
window.addEventListener("load", setUpDirections, false);

