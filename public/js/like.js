
const likeButtons = document.querySelectorAll(".heart");

// Iterate through each like button and add a click event listener
likeButtons.forEach(likeButton => {
  const heartIcon = likeButton.querySelector(".heart-icon");
  const likesAmountLabel = likeButton.nextElementSibling; // Assumes likes-amount is a sibling element

  // Prevent the default click behavior on the heart icon
  heartIcon.addEventListener("click", (event) => {
    event.preventDefault();
  });

  likeButton.addEventListener("click", () => {
    heartIcon.classList.toggle("liked");
    likesAmountLabel.innerHTML = parseInt(likesAmountLabel.innerHTML) + 1;
  });
});