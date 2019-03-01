/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space


//Task 2
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


//Task 3
$(document).ready(function(){
var getValue = function(){
  inputs = {url:$("#url-input1").value(),
  lat:$("#numeric-input1").value(),
  lng:$("#numeric-input2").value()};
  return inputs;
};

var parseData = function(downloadedData){
  return JSON.parse(downloadedData);
};

var makeMarkers = function(json){
  var markersList = [];
  _.each(json, function(myObject) {
    markersList.push(L.marker([myObject.LAT,myObject.LONG_]));
  });
  return markersList;
};

var plotMarkers = function(marker) {
  _.each(marker,function(m) {
    m.addTo(map);
  });
};

    $("#button1").click(function(){
      var data = getValue();
      $.ajax(data.inputURL).done(function(d){
        parsed = parseData(d);
        markers = makeMarkers(parsed(d));
        plotMarkers(markers);
        markers2 = L.marker([data.inputLat, data.inputLng]).addTo(map);
      });
    });
  });
