const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl,isLoggedIn,isProfileOwner,validateUser,varifyEmail,varifyUserEmail } = require("../middleware");

const userController = require("../controllers/users")

const multer  = require('multer')            //install multer package in npm || multipart/form-data type receive and paras
// const upload = multer({ dest: 'uploads/' })  //uploads folder me save karega
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

// Router.route-----------------------
router.route("/signup")
    .get(userController.renderSignupForm)               //signup-----------
    .post(varifyEmail,validateUser,wrapAsync(userController.signUser))



router.route("/login")
    .get(userController.renderLoginForm)                //login----------
    .post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}), wrapAsync(userController.loginUser))
    //passpost.authenticate -> middleware h || local Strategy failureRedirect -> login hone me problem aati h to "/login" me redirect hoge || or flash ho jayega


router.get("/logout",userController.logoutUser)     //logout----------

router.get("/", (req, res) => {                     //redirect home page---------
    res.redirect("/listings")
})
router.get("/update-form/:id",isLoggedIn,isProfileOwner, wrapAsync(userController.updateFormRender))  //update  form render------------

router.post("/update-password/:id", isLoggedIn, isProfileOwner, wrapAsync(userController.updatePassword))  //update password ------------

router.post("/update-account/:id", isLoggedIn, isProfileOwner, varifyUserEmail, validateUser, wrapAsync(userController.updateAccount))  //update account------------

router.post("/update-image/:id", isLoggedIn, isProfileOwner, upload.single('image'), wrapAsync(userController.updateImage))  //update image------------

router.route("/change-image/:id")
    .get(isLoggedIn,isProfileOwner,userController.renderImageChangeForm)
    .post(isLoggedIn,isProfileOwner,upload.single('image'), wrapAsync(userController.updateImage))  //update image------------

router.delete("/delete/:id",isLoggedIn,isProfileOwner, wrapAsync(userController.deleteAccount))  //delete account------------

module.exports = router;                            //export---app.js---------------

