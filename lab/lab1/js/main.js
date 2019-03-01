var htmlTemplate = (school) => `
      <div class="card">
        <div class="school-name"> ${school.FACIL_NAME} </div>
        <div class="school-type"> ${school.GRADE_LEVEL} </div>
        <div class="address"> ${school.FACIL_ADDRESS} </div>
      </div>
      `; var htmlForSchools = '';

      schools.forEach(function(x) {
        console.log(x); var html = htmlTemplate(x);
        htmlForSchools = htmlForSchools + html; });


        // document.querySelector('#card1 .address').innerHTML = "Philadelphia"


        $(".cards").html(htmlForSchools);
