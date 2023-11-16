let page = document.querySelector(".pageblur");
let containerbtn = document.querySelector(".showfilter");
filterClick = () => {
  containerbtn.classList.add("filterbtnClick");
  page.classList.add("containerblur");
};

closefilter = () =>{
  containerbtn.classList.remove("filterbtnClick");
  page.classList.remove("containerblur");  
}