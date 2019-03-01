/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
// We set this to HTTP to prevent 'CORS' issues

$(document).ready(function() {

var downloadData = $.ajax($('#URL-input').val());
var parseData = function(dat) {
  console.log(dat)
  return JSON.parse(dat);
};
var latkey = $('#lat-input').val();
var lonkey = $('#lon-input').val();
var myMarkers = [];

var makeMarkers = function(lst) {
  markers = _.map(lst, (datum) => { return L.marker([datum[latkey], datum[lonkey]]).bindPopup("<b>" + datum[latkey] +", "+ datum[lonkey] + "</b>") })
};

var plotMarkers = function() {
  myMarkers = _.each(markers, (c) => {
    c.addTo(map);
  });
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

var removeMarkers = function() {
  _.each(myMarkers, (d) => {
    map.removeLayer(d)
  });
  $('#URL-input').val("URL here");
  $('#lat-input').val("latitude key");
  $('#lon-input').val("longitude key");
};


/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */

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

$('button#plot').click(function(e) {
var parsed;
var markers;
  downloadData.done(function(data) {
  parsed = parseData(data);
  markers = makeMarkers(parsed);
  plotMarkers();
});
});

$('button#refresh').click(function(e) {
  removeMarkers();
});
});
