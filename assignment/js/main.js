/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
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

 $("#URL-input").val("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json");
 $('#Lat-input').val('latitude key');
 $('#Lon-input').val('longitude key');
 var url = $('#URL-input').val();
 var latitudekey = $('#Lat-input').val();
 var longitudekey = $('#Lon-input').val();


var downloadData = $.ajax(url);
var parseData = function(data) {return JSON.parse(data)};
var makeMarkers = function(parsed) {
  var markers = [];
  _.forEach(parsed, function(j){
    markers.push(L.marker([j.Lat, j.Lng]))
});
  return markers;
};

var plotMarkers = function(markers) {
  _.forEach(markers, function(k) {
    k.addTo(map);
  });
};

  var removeMarkers = function(markers) {
    _.forEach(markers, function(x) {
      map.removeLayer(x)});
  };

$('#But').click(function(){
  downloadData.done(function(data) {
    var parsed = parseData(data);
    var markers = makeMarkers(parsed);
    plotMarkers(markers);
  })
});

$('#But_Remove').click(function(){
  removeMarkers(markers)
});
