let reviewBoxStart = document.getElementById("review-box-start")
let reviewBoxEnd = document.getElementById("review-box-end")

let listBtn = document.querySelector(".choose-list #listBtn")
let reviBtn = document.querySelector(".choose-list #reviBtn")

listBtn.addEventListener("click",()=> {
    reviewBoxStart.style.display = "none"
    reviewBoxEnd.style.display = "inline"
})
reviBtn.addEventListener("click",()=> {
    reviewBoxStart.style.display = "inline"
    reviewBoxEnd.style.display = "none"

})