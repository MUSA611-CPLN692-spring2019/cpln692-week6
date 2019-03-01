/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space

 In your index.html file, add four elements:

 1. Text input field, which will represent the URL of your dataset
 2. Text input field, which will represent the latitude key in your data
 3. Text input field, which will represent the longitude key in your data
 4. Button, which will run your script

 Regarding the latitude and longitude keys: remember that each dataset has its
 own key or label for these values. For example,
 [philadelphia bike crashes](https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json)
 uses LAT and LNG while
 [solar installations](https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-solar-installations.json)
 uses X and Y or LONG and LAT. The user will need to be able to enter the keys
 which they hope to extract Latitude/Longitude information from in addition to
 the URL for the dataset.

 #### Task 3

 Make sure it works.
 The user should be able to type in a URL of one of our datasets,
 as well as the keys for latitude and longitude, click the button, and have
 their specified dataset mapped.

 To do this, you will need to use jQuery to select the button and create a click
 event on it. When the button is clicked, it should run a function that selects
 the three input fields, checks their values, and assigns those values to
 variables. Those variables should be used in your application to replace
 previously hardcoded data.


===================== */


// We set this to HTTP to prevent 'CORS' issues

var parseData = function(data) {
    return JSON.parse(data);
};

var makeMarkers = function(data, key1, key2) {
  var markersList = [];
  _.each(data, function(p) {
    markersList.push(L.marker([p[key1],p[key2]])); //p.key1
  });
  return markersList;
};

var plotMarkers = function(marker) {
  _.each(marker,function(m) {
    m.addTo(map);
  });
};


var removeMarkers = function(marker) {
  _.each(marker,function(layer) {
    map.removeLayer(layer);
  });
};


/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

var dataInput = {};

var dataRead = function() {
  dataInput = {url: $('#textInput1').val(),
              latKEY:$('#textInput2').val(),
              longKEY:$('#textInput3').val()};
        return dataInput;
      };



var m = [];

$('#button1').click(function() {
  dataRead();
  console.log(dataInput);
  $.ajax(dataInput.url).done(function(data) {
    console.log(parseData(data));
    m = makeMarkers(parseData(data), dataInput.latKEY, dataInput.longKEY);
    console.log(m);
    plotMarkers(m);
  });
});

$('#button2').click(function() {
  removeMarkers(m);
});
