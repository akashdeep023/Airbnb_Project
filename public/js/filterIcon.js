let page = document.querySelector(".pageblur");
let containerbtn = document.querySelector(".showfilter");
// let filtericon = document.querySelectorAll(".filterIcon");
filterClick = () => {
//   console.log("click");
  containerbtn.classList.add("filterbtnClick");
  page.classList.add("containerblur");
};
