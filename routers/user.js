const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users")

// Router.route-----------------------
router.route("/signup")
.get(userController.renderSignupForm)               //signup-----------
.post(wrapAsync(userController.signUser))



router.route("/login")
.get(userController.renderLoginForm)                //login----------
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}), wrapAsync(userController.loginUser))
//passpost.authenticate -> middleware h || local Strategy failureRedirect -> login hone me problem aati h to "/login" me redirect hoge || or flash ho jayega


router.get("/logout",userController.logoutUser)     //logout----------

router.get("/", (req, res) => {                     //redirect home page---------
    res.redirect("/listings")
})

module.exports = router;                            //export---app.js---------------

