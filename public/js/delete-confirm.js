// User button click then display delete confirmation box----------

// single delete btn-----
const deleteFnx = document.querySelector(".delete-fnx");
const deleteButton = document.querySelector("#delete-confirm");
const cancleButton = document.querySelector(".cancle-confirm");
deleteButton.addEventListener("click", () => {
	deleteFnx.style.display = "flex";
});
cancleButton.addEventListener("click", () => {
	deleteFnx.style.display = "none";
});

// many delete btn------
const deleteButtons = document.querySelectorAll("#delete-confirm");
const cancleButtons = document.querySelectorAll(".cancle-confirm");
for (const button of deleteButtons) {
	button.addEventListener("click", () => {
		button.nextSibling.nextSibling.firstChild.nextSibling.style.display = "flex"
	});
}
for (const cancleBtn of cancleButtons) {
	cancleBtn.addEventListener("click", () => {
		cancleBtn.parentElement.style.display = "none";
	});

}