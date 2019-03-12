/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
// We set this to HTTP to prevent 'CORS' issues
//task 2&3
$("#url-input").val("http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json");
$('#numeric-input1').val('39.9771532618949');
$('#numeric-input2').val('-75.1716547369047');

$(document).ready(function(){

var downloadData = function(){
  var inputfield = {url:$("#url-input").val(),lat:$("#numeric-input1").val(),lng:$("#numeric-input2").val()};
  return inputfield;
};

var parseData = function(data) {return JSON.parse(data)};

var makeMarkers = function(array) {
  var newmarkers = []
    _.each(array,function(obj){
    newmarkers.push(L.marker([obj.Lat, obj.Lng]))
  });
    return newmarkers
  };

  var plotMarkers = function(newmarker) {
    _.each(newmarker,function(marker){
      marker.addTo(map)
    })
  };

/* =====================
    Define the function removeData so that it clears the markers you've written
    from the map. You'll know you've succeeded when the markers that were
    previously displayed are immediately removed from the map.
    In Leaflet, the syntax for removing one specific marker looks like this:
    map.removeLayer(marker);
    In real applications, this will typically happen in response to changes to the
    user's input.
===================== */
var removeMarkers = function(markers) {
  _.each(markers,function(marker){
    map.removeLayer(marker);
  })
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
  $("#button").click(function(){
    var data = downloadData();
    $.ajax(data.inputfieldURL).done(function(dat){
    parsed = parseData(dat);
    markers = makeMarkers(parsed(dat));
    plotMarkers(markers);
    markers = L.marker([data.inputfieldLat, data.inputfieldLng]).addTo(map);
  });
 });
});
