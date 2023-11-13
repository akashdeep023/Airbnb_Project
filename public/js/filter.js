// filters icon ---------------

const filters = document.querySelectorAll(".filter");

// Function to apply styles based on the selected filter
function applyStyles(selectedFilter) {
  // Remove 'selected' class from all filters
  filters.forEach((f) => f.classList.remove("selectedFilter"));
  
  // Add 'selected' class to the clicked filter
  const selectedElement = document.querySelector("." + selectedFilter);


  if (window.location.pathname === "/listings") {
    filters[0].classList.add('selectedFilter')
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
