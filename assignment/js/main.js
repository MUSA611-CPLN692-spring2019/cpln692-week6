// SETUP
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

// DOCUMENT READY

$(document).ready(function() {

  var markers=[];

  var parseData = function(data) {
    return JSON.parse(data);
  };

  var readinput = function(){
    var input = {
      url : $('#url-input').val(),
      lat : $('#lat-input').val(),
      lng : $('#long-input').val()
    };
  return input;
  };

  var makeMarkers = function(list, xlabel, ylabel) {
    var listofmarkers = [];
    _.each(list, function(o) {
      listofmarkers.push(L.marker([o[xlabel], o[ylabel]]));
    });
    return listofmarkers;
  };

  var plotMarkers = function(list) {
    _.each(list, function(o) {
      o.addTo(map);
    });
  };

  var removeMarkers = function(listofmarkers) {
    _.each(listofmarkers, function(o) {
      map.removeLayer(o);
    });
  };

  /* =====================
   CODE EXECUTED HERE!
  ===================== */
  $('#help').click(function(){
        var inputs = readinput();

        $.ajax(inputs.url).done(function(data) {
          var parsed = parseData(data);
          var keys = Object.keys(parsed[0]);

          var list='';
          for (var i in keys){
            list = list + keys[i] + '\n';
          };

          alert(list);
        });
  });

  $('#plot').click(function() {
    var inputs = readinput();


    $.ajax(inputs.url).done(function(data) {
      var parsed = parseData(data);
      removeMarkers(markers);

      markers = makeMarkers(parsed, inputs.lat, inputs.lng);
      plotMarkers(markers);
    });

});

  $('#clear').click(function() {
    removeMarkers(markers);
  });

});
