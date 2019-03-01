/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */


// 1. enable the inputs
var inputlabels = ['#url','#latitudeKey','#longitudeKey'];
for (let i = 0; i< inputlabels.length; i++) {
    $(inputlabels[i]).prop('disabled', false);
  }

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


// 3. define the function to remove existed markers
var removeMarkers = function(data) {
  _.each(data, (obj) => {return map.removeLayer(obj)});
};

// 4. define the function to get user input
$('#url').val('https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json')
var read = function() {
  var inputs = {url:$('#url').val(),
                Lat:$('#latitudeKey').val(),
                Lng:$('#longitudeKey').val(),
  }
  return inputs
}


// 5.define the function to parse data
var parseData = function(data) {
  var parsed =  JSON.parse(data);
  return parsed
};


// 6. define plot function
var plotMarkers = function(data) {
  for (let i = 0; i< data.length; i++){
    data[i].addTo(map)}};

// 7. Conduct the function in sequence when there's a click action
  $( 'button' ).click(function() { //first the user do the click
    var inputData = read();
    $.ajax(inputData['url']).done(function(results){ // then we download the data from the url. use".done()" to set the sequence
      removeMarkers(results)
    //  console.log('inside') // to check if the functions work in line
      var parsed = parseData(results);
      var lat = inputData['Lat'];
      var lng = inputData['Lng'];
      var markers = [];
      for (let i = 0; i< parsed.length; i++){
          var a = L.marker([parsed[i][lat],parsed[i][lng]]);
          markers.push(a);}
    //  console.log(markers) to check if the markers are created successfully
      plotMarkers(markers);
    //  console.log('outside') // to check if the functions work in line
  });
});
