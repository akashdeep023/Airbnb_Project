let taxSwitchs = document.querySelectorAll("#flexSwitchCheckDefault");
let changeAfter = document.querySelectorAll(".changeAfter");
for (let taxSwitch of taxSwitchs) {
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    let priceInfo = document.getElementsByClassName("price-info");
    for (tax of taxInfo) {
      if (tax.style.display != "inline") {
        tax.style.display = "inline";
        for (const changeA of changeAfter) {
          changeA.innerHTML = "Display total after taxes ..";          
        }
      } else {
        tax.style.display = "none";
      }
    }
    for (price of priceInfo) {
      if (price.style.display != "none") {
        price.style.display = "none";
      } else {
        price.style.display = "inline";for (const changeA of changeAfter) {
          changeA.innerHTML = "Display total before taxes ";          
        }
      }
    }
  });
}
let taxSwitchsS = document.querySelectorAll("#flexSwitchCheckDefaultS");
for (let taxSwitch of taxSwitchsS) {
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    let priceInfo = document.getElementsByClassName("price-info");
    for (tax of taxInfo) {
      if (tax.style.display != "inline") {
        tax.style.display = "inline";
        for (const changeA of changeAfter) {
          changeA.innerHTML = "Display total after taxes ..";          
        }
      } else {
        tax.style.display = "none";
      }
    }
    for (price of priceInfo) {
      if (price.style.display != "none") {
        price.style.display = "none";
      } else {
        price.style.display = "inline";for (const changeA of changeAfter) {
          changeA.innerHTML = "Display total before taxes ";          
        }
      }
    }
  });
}
