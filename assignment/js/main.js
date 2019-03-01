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

// We set this to HTTP to prevent 'CORS' issues
var theUrl;
var latitudeKey;
var longtitudeKey;

var downloadData;

var makeMarkers = function(parsedData) {
  return _.map(parsedData, function(myObject){
    latitudeKey = $('#text-input2').val();
    longtitudeKey = $('#text-input3').val();
    return L.circleMarker([myObject[latitudeKey], myObject[longtitudeKey]]);
  });
};

$('body > div.sidebar > button').click(function(){
  $(document).ready(function(){
    theUrl = $('#text-input1').val();
    downloadData = $.ajax(theUrl);
  });

  downloadData.done(function(data){
    var markers = makeMarkers(JSON.parse(data));
    _.each(markers, function(marker){
      marker.addTo(map);
    });
  });
});
