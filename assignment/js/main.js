/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json");

//change data into JSON format
var parseData = function(data){
   return JSON.parse(data);
};

//add markers - using map function since
var makeMarkers = function(data) {
  return _.map(data, function(point){
    return L.marker([point.LAT, point.LONG_]);
  });
};

var plotMarkers = function(data) {
  _.forEach(data, function(point) {
    point.addTo(map);
  });
};

//remove markers function
var removeMarkers = function(data) {
  return _.map(data, function(point) {
    return map.removeLayer(point);
  });
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

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
  //removeMarkers(markers);
});
