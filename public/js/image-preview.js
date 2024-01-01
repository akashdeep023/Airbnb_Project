function previewImage() {
	const fileInput = document.getElementById("verify-img");
	const imagePreview = document.getElementById("imagePreview");

	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();

		reader.onload = function (e) {
			imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
		};

		reader.readAsDataURL(file);
	} else {
		imagePreview.innerHTML = "";
	}
}
