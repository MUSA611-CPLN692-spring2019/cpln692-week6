/* =====================

===================== */
// default
$("#url").val("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json");
$('#lat').val('Lat');
$('#lon').val('Lng');
var url = $('#url').val();
var lat = $('#lat').val();
var lon = $('#lon').val();
console.log(url);

// download and parse data
var downloadData = $.ajax(url);
var parseData = function(string) {
  return JSON.parse(string);
};
var makeMarkers = function(data) {
  var markers = []
  _.each(data, function(obj){
    markers.push(L.marker([obj[lat], obj[lon]]))
  })
  return markers;
};
var plotMarkers = function(markers) {
  _.each(markers, function(marker){
    marker.addTo(map)
  })
};

var map = L.map('map', {
  center: [39.954064, -75.197711],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var markers = [];

$('#bnt_Map').click(function(){
  downloadData.done(function(data) {
    parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);
  });
});

$('#bnt_Clear').click(function(){
  removeMarkers(markers);
});
