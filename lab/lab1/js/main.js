
function accordion() {
  var lid = document.getElementsByClassName("lid"); //getting a particular class by its name

  for (let i = 0; i < lid.length; i++) {
    lid[i].addEventListener("click", function() {
      this.classList.toggle("active"); //adding interactivity

      var panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";

      } else {
        panel.style.display = "block";
      }
    });
  }
};


function Schooldisplay(data) {
  data.forEach(function(school) {
    document.getElementById("schools").innerHTML += `
      <div class="card">
        <div class="s-name">${school.FACILNAME_LABEL}</div>
        <div class="s-type">${school.GRADE_LEVEL}</div>
        <div class="s-address">${school.FACIL_ADDRESS}</div>
      </div>
    `
  });
};

accordion();
Schooldisplay(schools);
