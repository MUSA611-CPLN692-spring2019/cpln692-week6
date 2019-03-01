accordion();
populate(schools);

function accordion() {
  var lid = document.getElementsByClassName("lid");

  for (let i = 0; i < lid.length; i++) {
    lid[i].addEventListener("click", function() {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;
      var close = getFirstChildByClass(this,"x");

      if (panel.style.display === "none") {
        panel.style.display = "block";
        close.style.transform = "rotate(0deg)";
      } else {
        panel.style.display = "none";
        close.style.transform = "rotate(45deg)";
      }
    });
  }
};

function populate(data) {
  data.forEach(function(sch) {
    document.getElementById("schools").innerHTML += `
      <div class="card">
        <div class="c-name">${sch.FACILNAME_LABEL}</div>
        <div class="c-type">${sch.GRADE_LEVEL}</div>
        <div class="c-address">${sch.FACIL_ADDRESS}</div>
      </div>
    `
  });
};

var getFirstChildByClass = function(elem,cl) {
  let child;
  for (let i = 0; i < elem.childNodes.length; i++) {
    if (elem.childNodes[i].className == cl) {
      child = elem.childNodes[i];
      break;
    }
  }
  return child;
}
