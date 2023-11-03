let taxSwitchs = document.querySelectorAll("#flexSwitchCheckDefault");
for (let taxSwitch of taxSwitchs) {
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    let priceInfo = document.getElementsByClassName("price-info");
    for (tax of taxInfo) {
      if (tax.style.display != "inline") {
        tax.style.display = "inline";
      } else {
        tax.style.display = "none";
      }
    }
    for (price of priceInfo) {
      if (price.style.display != "none") {
        price.style.display = "none";
      } else {
        price.style.display = "inline";
      }
    }
  });
}
