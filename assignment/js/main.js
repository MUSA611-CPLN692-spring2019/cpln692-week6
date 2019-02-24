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

$(document).ready(function() {
  var parseData = function(url) { return JSON.parse(url); };
  var makeMarkers = function(json, lat, long) {
    var markers = [];
    _.each(json, function(feature) {
      markers.push(L.marker([feature[lat], feature[long]]));
    });
    return markers;
  };
  var plotMarkers = function(markers) {
    _.each(markers, function(m) { m.addTo(map); });
  };
  var removeMarkers = function(markers) {
    _.each(markers, function(m) {
      map.removeLayer(m);
    });
  };
  var read = function() {
    var inputs = {url : $('#url').val(),
                  lat : $('#lat').val(),
                  long : $('#long').val()};
    return inputs;
  };

  var markers = [];

  $("#map-button").click(function() {
    var data = read();
    $.ajax(data.url).done(function(d) {
      markers = makeMarkers(parseData(d), data.lat, data.long);
      plotMarkers(markers);
    });
  });

  $("#clear").click(function() {
    removeMarkers(markers);
  });
});
