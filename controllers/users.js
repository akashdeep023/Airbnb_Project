const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.renderSignupForm = (req, res) => {
	res.render("users/signup");
};

module.exports.signUser = async (req, res, next) => {
	try {
		let { fName, lName, username, email, password } = req.body;
		const newUser = new User({ fName, lName, email, username });
		const registeredUser = await User.register(newUser, password);
		req.login(registeredUser, (err) => {
			if (err) {
				return next(err);
			}
			req.flash("success", "User was registered and Login");
			res.redirect("/listings");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/signup");
	}
};

module.exports.renderLoginForm = (req, res) => {
	res.render("users/login");
};

module.exports.loginUser = async (req, res, next) => {
	req.flash("success", "Welcome back to Wanderlust! ");
	let redirectUrl = res.locals.redirectUrl || "/listings";
	res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "You are logged out!");
		res.redirect("/listings");
	});
};

module.exports.updateFormRender = async (req, res, next) => {
	let { id } = req.params;
	let user = await User.findById(id);
	res.render("users/update.ejs", { user });
};
module.exports.updateAccount = async (req, res, next) => {
	try {
		let { id } = req.params;
		let { fName, lName, username, email } = req.body;
		const user = await User.findByIdAndUpdate(id, {
			fName: fName,
			lName: lName,
			username: username,
			email: email,
		});
		req.flash("success", "Your account updated successfully.");
		res.redirect("/profile");
	} catch (e) {
		req.flash("error", e.message);
		res.redirect(`/update-form/${req.user._id}`);
	}
};

module.exports.updatePassword = async (req, res, next) => {
	try {
		let { id } = req.params;
		const user = await User.findById(id);
		await user.changePassword(req.body.oldPassword, req.body.newPassword);
		await user.save();
		req.flash(
			"success",
			"Your account password has been successfully updated."
		);
		res.redirect("/profile");
	} catch (e) {
		req.flash("error", "Old password doesn't match.");
		res.redirect(`/update-form/${req.user._id}`);
	}
};

module.exports.updateImage = async (req, res, next) => {
	try {
		let { id } = req.params;
		let url = req.file.path;
		let filename = req.file.filename;
		let user =await User.findById(id)
		user.image = { url, filename };
		await user.save();
			req.flash("success", "Your account image has been successfully updated.");
			res.redirect("/profile");
	} catch (e) {
		req.flash("error", e.message);
		res.redirect(`/update-form/${req.user._id}`);
	}
};
module.exports.renderImageChangeForm =async (req, res, next) => {
	let { id } = req.params;
	let user = await User.findById(id);
	res.render("users/changeImage.ejs", { user });
}

module.exports.deleteAccount = async (req, res, next) => {
	try {
		let { id } = req.params;
		await Listing.deleteMany({ owner: id });
		await Review.deleteMany({author: id})
		await User.findByIdAndRemove(id);
		// req.logout();
		req.flash("error", "Your account has been successfully deleted.");
		res.redirect("/listings");
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/listings");
	}
};


