let passwordBox = document.getElementById("password-box")
let detailBox = document.getElementById("detail-box")
let imageBox = document.getElementById("image-box")

let passwordFind = document.querySelector("#password-find")
let detailFind = document.querySelector("#detail-find")
let imageFind = document.querySelector("#image-find")

detailFind.addEventListener("click",()=> {
    passwordBox.style.display = "none"
    detailBox.style.display = "inline"
    imageBox.style.display = "none"
})
imageFind.addEventListener("click",()=> {
    imageBox.style.display = "inline"
    passwordBox.style.display = "none"
    detailBox.style.display = "none"
})
passwordFind.addEventListener("click",()=> {
    passwordBox.style.display = "inline"
    detailBox.style.display = "none"
    imageBox.style.display = "none"
})