/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var bikeData = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json";

//Create the map
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

$("#url").val(bikeData);
$("#lat").val("LAT");
$("#lon").val("LNG");

//function for parsing data
var parseData = function(str){

    return JSON.parse(str);

};

//function for creating markers from parsed crime data
var makeMarkers = function(parsed,lat,lng){
  var markers = [];
  _.each(parsed, function(d){
    markers.push(L.marker([d[lat],d[lng]]));
  });
  return markers;
};

//function for plotting the markers created from function above
var plotMarkers = function(markers) {
	  _.each(markers, function(m){
	    m.addTo(map);
	  });
	};

//function for removing markers
var removeMarkers = function(markers) {
  _.each(markers, function(m) {
    map.removeLayer(m);
  });
};

var markers;

//call functions
$("#plot").click(function() {
  var url = $("#url").val();
  var lat = $("#lat").val();
  var lon = $("#lon").val();

  var request = $.ajax(url);
  request.done(function(str){
    var parsed = parseData(str);
    console.log("url", url);
    console.log("successful parse");
    console.log(parsed);
    var markers = makeMarkers(parsed,lat,lon);
    console.log("successful marker creation");
    plotMarkers(markers);
    console.log("successful marker plot");
  });
});

$("#unplot").click(function(){
  removeMarkers(markers);
  console.log("successful marker removal");
});
