/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space - FOUND OUT HOW TO DO ORIGINAL WEEK 4 LAB 2 PART 2 CODE (BEFORE MODIFICATION FOR THIS ASSIGNMENT) FROM SCOTT MULLARKEY
===================== */
  var lat = $('#lat').val(); //Tries to turn the user-inputted latitude key as a value here for the makeMarkers function. Line below does same but for the longitude one
  var long = $('#long').val();

  var testing; //Variable to store the results of the .ajax scraping call in

  var downloadData = $.ajax("https://#url").done(function(ajaxResponseValue) { //This is supposed to scrape the user inputted website. The "https://#url" has 2 components: 1) The "https://" gets rid of the CORS issue that kept popping up in the console, 2) The "#url" connects the front-end user inputted-URL to the back-end JavaScript code sheet here. This is the only part of the application that seems to connect properly as of now.
  var testing = ajaxResponseValue; //This is supposed to store the contents of the scraped user-inputted website

  var parseData = _.map(JSON.parse(testing), function(obj) {
    return _.pick(obj, 'long', 'lat');
  }); //Supposed to parse the user-inputted URL by picking out the user-inputted longitude and latitude fields. The user would type in the name of the latitude and longitude keys, and this would search through the parsed scraping results to look for the keys with the user-inputted names. There are no pound signs for 'long' and 'lat' since the long and lat variables were created at the beginning of this file which turn the user-inputted latitude and longitude key entries into their values.

  var makeMarkers = _.map(parseData, function(obj) {
    return L.marker([obj[lat], obj[long]]);
  }); //Supposed to make the markers by first looking for the elements in the function's input (the scraped results array of arrays) that correspond with what the user typed in for the latitude and longitude key name entry boxes in the front-end, then makes a marker out of those using L.marker. There are no pound signs or single quotation marks for the long and lat parts of the L.marker() command because the long and lat variables created at the beginning of this file

  var plotMarkers = _.map(makeMarkers, function(obj) {
    return obj.addTo(map)
  }); //Supposed to plot the markers made with the makeMarkers function above
});


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


$('#mapping-button').click(function(){
  downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
});
}); //This is supposed to create the functionality/reactivity for the mapping button created in the front-end index.html file. All of the lines in it come from what the professors pre-wrote at the bottom of Week 4 Lab 2 Part 2

$('#clear-button').click(function(){
  removeMarkers(markers);
}); //This is supposed to create the functionality/reactivity for the clearing markers button created in the front-end index.html file. The removeMarkers line in it also comes from what the professors pre-wrote at the bottom of Week 4 Lab 2 Part 2
