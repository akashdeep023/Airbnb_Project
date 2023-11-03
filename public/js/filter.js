// filters icon ---------------
let filter = document.querySelectorAll(".filter");
for (const filt of filter) {
  filt.addEventListener("click", function () {
    for (const filt of filter) {
      console.log("filter")
      filt.style.opacity = "0.6";
      filt.style.borderBottom = "none";
      
    }
    filt.style.opacity = "1";
    filt.style.borderBottom = "2.5px solid #000";
  });

}
