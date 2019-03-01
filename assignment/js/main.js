/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */



// 1. remove existed markers
var removeMarkers = function(data) {
  _.each(data, (obj) => {return map.removeLayer(obj)});
};



// 2. set map
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


// 3. get user input
$('#url').val('https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json')
var read = function() {
  var inputs = {url:$('#url').val(),
                Lat:$('#latitude').val(),
                Lng:$('#longitude').val(),
  }
  return inputs
}


// 4.parse data
var inputData = read();// read the user input
var downloadData = $.ajax(inputData[url]);
console.log(downloadData);
var parseData = function(data) {
  var parsed =  JSON.parse(data);
  return parsed
};



// 5. define plot function

var plotMarkers = function(data) {
  for (let i = 0; i< data.length; i++){
    data[i].addTo(map)}};
  $( 'button' ).click(function() {
    console.log(inputData);
    var parsed = parseData(downloadData);
    var markers = [];
    var markerOption = {radius:20,color:data.color,fill:data.color,opacity:1}
    for (let i = 0; i< parsed.length; i++){
      var a = L.circlemarker([parsed[i].inputData[Lat],parsed[i].inputData[Lng]],markerOption);
      markers.push(a);}
    plotMarkers(markers)
  });
