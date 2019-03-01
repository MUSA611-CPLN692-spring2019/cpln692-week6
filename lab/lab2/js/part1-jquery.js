/* =====================
  Set up our map
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
  Lab - jQuery

  In this course, we've set our focus on HTML, CSS, & Javascript as they are useful in the construction
  of mapping applications. One thing that isn't yet clear is how to handle user input. This is difficult
  because we've got to expand our thinking to include HTML, javascript, and their interactions - the
  fields with which a user can interact are specified in HTML <input> elements. We've already seen
  how CSS solves the HTML reference problem (with the use of selectors) and can extend that syntax
  into our work with javascript.




  Task 6: Plot input data to the map on button click
    Modify this form to include at least a lat (number), long (number), description (text), and
    color (color) inputs. With these inputs you should be able to plot a circle marker
    (http://leafletjs.com/reference.html#circlemarker) to the lat/long on the form, with the color
    provided, and a bound popup which gives you the description.

  // STRETCH GOALS
  Task 7: Use default values - OPTIONAL
    We don't want the application to crash if our user fails to enter values for every field. Add
    whatever logic is necessary to set default values if a field is empty.

  Task 8: Try Leaflet's divIcon
    Instead of using a default leaflet marker or a circleMarker, try using a L.divIcon. A div icon
    is just an HTML <div> element on which CSS can be applied (HINT: background-color or
    background-image are necessary if you want to see the icon). When you've successfully implemented
    a divIcon, you should be able to grab it by reference to its class: 'leaflet-marker-icon'. So,
    in jQuery, $('.leaflet-marker-icon').

  Task 9: Make a parametric function (one that accepts parameters/arguments) to fill the form out.
    At this point, we have an object which corresponds to a (at least partially) filled out form.
    That being so, we should be able to write a function that accepts, as an argument,
    one of those objects and properly fills out the form to match the values of that object. Try to
    update the code below so that an object entered into your form-filling function is stored on the
    HTML and fully reconstituted by the code you've written to read from the form.

    Use `_.isEqual` to make sure the object you feed in is the same as the one you read back out.
===================== */

// Take note of our use of jQuery here: $(document).ready(functionToCallWhenReady)
// This is a popular pattern that you'll run into in programs that run jQuery. It says not to run
// the function passed to `ready` until the HTML document is fully loaded and all scripts have
// been interpreted. It is, therefore, an example of asynchronous behavior.
$(document).ready(function() {
  // Do your stuff here
  $('#main-heading').text("CREEP SEARCH");

  $('#text-label1').text("My Full Name");
  $('#text-input1').val("Spartacus Consultareian");

  $('#text-label2').text("Longitude pls");
  $('#text-input2').val("-75.177397");

  $('#text-label3').text("Latitude pls");
  $('#text-input3').val("39.946984");

  $('#number-label').text("SSN");
  $('#numeric-input').val(2222222222);

  $('#checkbox-label1').text("Can we get your credit card number?");
  $('#cbox-input1').prop("checked", true);

  $('#checkbox-label2').text("Can we come over?");
  $('#cbox-input2').prop("checked", true);

  $('#color-label').text("What's the color of your aura?");
  $('#color-input').val("#008080");

  $('button').text("Tracking You Down");


  var object = {
    name : $("#text-input1").val(),
    long : $("#text-input2").val(),
    lat : $("#text-input3").val(),
    ssn : $("#numeric-input").val(),
    cc : $("#cbox-input1").prop("checked"),
    comeOver : $("#cbox-input2").prop("checked"),
    color : $("#color-input").val(),
  };

  var inputs = ["#text-input1", "#text-input2", "#text-input3", "#numeric-input",
                "#cbox-input1", "#cbox-input2", "#color-input"];

  _.each(inputs, function(input) {
    $(input).prop("disabled", false);
  });

  $("button").click(function() {
    object = {
      name : $("#text-input1").val(),
      long : $("#text-input2").val(),
      lat : $("#text-input3").val(),
      ssn : $("#numeric-input").val(),
      cc : $("#cbox-input1").prop("checked"),
      comeOver : $("#cbox-input2").prop("checked"),
      color : $("#color-input").val(),
    };
    console.log(object);
    console.log(object.long);
    var marker = L.circleMarker([object.lat, object.long], {
      color: object.color
    }
    ).bindPopup(object.name + " <br>-Found You.").addTo(map);
  });
});
