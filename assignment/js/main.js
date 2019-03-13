/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space

"https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json"

===================== */
//I ran into an issue using my Week 4 Lab 2 code.  I had been using _.pick which requires specific terms in '' and does not work with
//a variable from an input like in this assignment.
//Based on last classes review I reworked the Week 4 code to allow for a variable.

//Tested by inputting the following commented data in the input window of HTML page
//URL Input: https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json
//Latitude Input: Y
//Longitude Input: X


$("#btn").click(function() {
var url = $("#url").val();console.log(url);
var lat = $('#lat').val();console.log(lat);
var lon = $('#lon').val();console.log(lon);
var downloadData = $.ajax(url);
var parseData = function(data) {return JSON.parse(data);};
var makeMarkers = function(x) {
  var markerarray = [];
  _.each(x, function(obj) {
  markerarray.push(L.marker([obj[lat], obj[lon]]))});
  return markerarray;
};

var plotMarkers = function(x) {
  _.each(x, function(obj){obj.addTo(map);});
};

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

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
})});
