// Click search input box then add box-shadow---------
const searchInputBox = document.querySelectorAll("#mySearchInput");
const box = document.querySelectorAll(".nav-search");
for (const searchInput of searchInputBox) {
	searchInput.addEventListener("input", function () {
		for (const searchBox of box) {
			searchBox.style.boxShadow =
				"inset 0px 6px 5px rgba(0, 0, 0, 0.700)";
			setTimeout(() => {
				searchBox.style.boxShadow =
					"inset 0px 2px 3px rgba(0, 0, 0, 0.800)";
			}, 100);
		}
	});
}

// User button click then display Profile box----------
const imgBar = document.querySelector("#png-img-bar");
const crossBar = document.querySelector("#png-img-cross");
const userFnx = document.querySelector(".user-fnx");
const userButton = document.querySelector(".nav-user");
userButton.addEventListener("click", () => {
	if (userFnx.style.display == "none") {
		userFnx.style.display = "flex";
		imgBar.style.display = "none";
		crossBar.style.display = "inline";
	} else {
		userFnx.style.display = "none";
		crossBar.style.display = "none";
		imgBar.style.display = "inline";
	}
});
