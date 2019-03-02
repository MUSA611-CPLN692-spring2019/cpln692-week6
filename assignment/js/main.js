/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
// We set this to HTTP to prevent 'CORS' issues
$('#text-input1').val('https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json');
//$('#text-input2').val('Latitude');
//$('#text-input3').val('Longitude');

var url = $('#text-input1').val();
var lat = $('#text-input2').val();
var long = $('#text-input3').val();

var downloadData = $.ajax(url);

var parseData = function(ajaxResponseValue) {return JSON.parse(ajaxResponseValue);};

var makeMarkers = function(parsed_Data) {
  var markers = [];
  _.each(parsed_Data, function(element){
    markers.push(L.marker([element.Lat, element.Lng]));
  });
  return markers;
};

var plotMarkers = function(markers) {
  _.each(markers, function(marker){
  marker.addTo(map);});
};

var removeMarkers = function(markers) {
  _.each(markers, function(marker){
  map.removeLayer(marker);});
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */
var parseData = function(ajaxResponseValue) {
  var filtered = JSON.parse(ajaxResponseValue);
  var return_list = [];
  _.each(filtered, function(record) {
    return_list.push(record);
  });
  return return_list;
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
var markers = [];

$('#button_add').click(function(){downloadData.done(function(data) {
  parsed = parseData(data);
  markers = makeMarkers(parsed);
  plotMarkers(markers);
  });
});

$('#button_remove').click(function(){
	removeMarkers(markers);
	});
