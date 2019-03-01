
//EDITED CODE!
//get entries

var parseData = function(web) {
  return JSON.parse(web);
};
console.log(parseData);

var makeMarkers = function(urlData) {
  var markers = [];
  _.forEach(urlData, function(obj) {
    markers.push(L.circleMarker([obj[object.lat], obj[object.long]],{
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 10
    }));
  });
  console.log(urlData);
  return markers;};

  var entries = function() {object = {
    url : $("#url").val(),
    lat : $("#lat").val(),
    long : $("#long").val()};
    console.log(object.url, object.lat, object.long);
    return object;
  };

var plotMarkers = function(markers) {
  _.forEach(markers, function(i){
    i.addTo(map);
  });
};

var removeMarkers = function(markers) {
  _.forEach(markers, function(i){
    map.removeLayer(i);
  });
};

var markers = [];

$("#btn").click(function(){
  var objs = entries();
$.ajax(objs.url).done(function(data) {
  parsed = parseData(data);
  markers = makeMarkers(parsed);
  plotMarkers(markers);
});});

$("#btnClear").click(function(){
    removeMarkers(markers);
});


//leaflet setup

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
