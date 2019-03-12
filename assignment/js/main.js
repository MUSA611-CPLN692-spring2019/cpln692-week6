/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var markers =[];
var downloadData = $.ajax($("#urlIn").val());
var lat = $("#latIn").val();
var lng = $("#lonIn").val();
var parseData = function(rawData) {return JSON.parse(rawData);};
var makeMarkers = function(pData) {
  markers = [];
  _.each(pData, (dataLine) => {
    markers.push(L.marker([dataLine[lat], dataLine[lng]]));
  });
  return markers;
};

var plotMarkers = function(marker) {
  _.each(marker, (mark) => {
    mark.addTo(map);
  });
};

var removeMarkers = function(markers) {
  _.each(markers, (rmMarker) => {
    map.removeLayer(rmMarker);
  });
};

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 13
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
  //console.log(parsed);
  var markers = makeMarkers(parsed);
  //console.log(markers);
  plotMarkers(markers);
});

$("#btn").click(function() {
  removeMarkers(markers);
  downloadData = $.ajax($("#urlIn").val());
  lat = $("#latIn").val();
  lng = $("#lonIn").val();
  downloadData.done(function(data) {
  parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
});
});
