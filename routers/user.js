const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl,isLoggedIn,isProfileOwner } = require("../middleware");

const userController = require("../controllers/users")

const multer  = require('multer')            //install multer package in npm || multipart/form-data type receive and paras
// const upload = multer({ dest: 'uploads/' })  //uploads folder me save karega
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

// Router.route-----------------------
router.route("/signup")
.get(userController.renderSignupForm)               //signup-----------
.post(upload.single('image'),wrapAsync(userController.signUser))



router.route("/login")
.get(userController.renderLoginForm)                //login----------
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}), wrapAsync(userController.loginUser))
//passpost.authenticate -> middleware h || local Strategy failureRedirect -> login hone me problem aati h to "/login" me redirect hoge || or flash ho jayega


router.get("/logout",userController.logoutUser)     //logout----------

router.get("/", (req, res) => {                     //redirect home page---------
    res.redirect("/listings")
})
router.get("/update/:id",isLoggedIn,isProfileOwner, wrapAsync(userController.updateFormRender))  //update  form render------------

router.post("/update/:id",isLoggedIn,isProfileOwner,upload.single('image'), wrapAsync(userController.updateAccount))  //update account------------

router.post("/change/:id", isLoggedIn, isProfileOwner, wrapAsync(userController.updatePassword))  //update password ------------

router.delete("/delete/:id",isLoggedIn,isProfileOwner, wrapAsync(userController.deleteAccount))  //delete account------------

module.exports = router;                            //export---app.js---------------

