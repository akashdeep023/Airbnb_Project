const express = require("express");
const router = express.Router();
const passport = require("../controllers/facebooks.js");

router.get(
	"/",
	passport.authenticate("facebook", {
		authType: "reauthenticate",
		display: "popup",
		scope: ["email", "basic_info", "user_photos"],
		profileFields: ["id", "displayName", "photos", "emails"],
	})
);

router.get(
	"/callback",
	passport.authenticate("facebook", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);

module.exports = router;
