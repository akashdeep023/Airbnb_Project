// filters icon -----------------------------------
const filters = document.querySelectorAll(".filter");
// Function to apply styles based on the selected filter
function applyStyles(selectedFilter) {
	// Remove 'selected' class from all filters
	filters.forEach((f) => f.classList.remove("selectedFilter"));
	// Add 'selected' class to the clicked filter
	const selectedElement = document.querySelector("." + selectedFilter);
	if (window.location.pathname === "/listings") {
		filters[0].classList.add("selectedFilter");
		return;
	}
	if (selectedElement) {
		selectedElement.classList.add("selectedFilter");
	}
}

// Add click event listener to each filter
filters.forEach((filter) => {
	filter.addEventListener("click", function () {
		const element = this.classList[1];
		console.log(element);
		// Store the selected filter in localStorage
		localStorage.setItem("selectedFilter", element);
		// Apply styles
		applyStyles(element);
	});
});
// On page load, check if a filter was previously selected and apply styles
const storedFilter = localStorage.getItem("selectedFilter");
if (storedFilter) {
	applyStyles(storedFilter);
}


// filters slide button add-----------------------------------
let filtersBox = document.querySelector("#filters");
let buttonSlide = document.querySelectorAll("#slideButton");

buttonSlide.forEach((button) => {
	button.addEventListener("click", () => {
		const direction = button.className == "left_img_button" ? -1 : 1;
		const scrollImg = direction * (filtersBox.clientWidth - 100);
		filtersBox.scrollBy({ left: scrollImg, behavior: "smooth" });
	});
});

filtersBox.addEventListener("scroll", () => {
		buttonSlide[0].style.display = filtersBox.scrollLeft <= 0 ? "none" : "flex"
		buttonSlide[1].style.display = filtersBox.scrollLeft >= (filtersBox.scrollWidth-filtersBox.clientWidth-5) ? "none" : "flex"
		console.log(filtersBox.scrollWidth)
		console.log(filtersBox.scrollWidth-filtersBox.clientWidth)
})
