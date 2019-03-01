/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
//set up the map
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
//Default situation
$('#URL-input').val('https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json');
$('#Lat-input').val('Latitude');
$('#Long-input').val('Longitude');
//read value
var url = $('#URL-input').val();
var lat = $('#Lat-input').val();
var long = $('#Long-input').val();
//function setting up
var downloadData = $.ajax(url);

var parseData = function(data) {
    return JSON.parse(data);
};

var makeMarkers = function(parseData) {
  markers = _.map(parseData, function(x){
    return L.marker([x.Lat, x.Lng]);
    });
  return markers;
};

var plotMarkers = function(markers) {
    _.forEach(markers, function(m) {
      m.addTo(map);
})};

var removeMarkers = function(markers) {
    _.forEach(markers, function(m) {
      map.removeLayer(m);
    });
};


$('#button-map').click(function(){
  downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
  });
});

$('#button-clear').click(function(){
  removeMarkers(markers);
});
