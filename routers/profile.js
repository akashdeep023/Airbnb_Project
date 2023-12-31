const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, isOwner, isOwnerAll ,isReviewAuthorProfile, isReviewAll} = require("../middleware.js")

const profileController = require("../controllers/profiles.js")

router.get("/", isLoggedIn, wrapAsync(profileController.profile))                                //PROFILE Route-------------

router.delete("/all-listings-delete/:id", isLoggedIn,isOwnerAll, wrapAsync(profileController.allListingDestroy))                                //PROFILE Delete All Listings Route-------------
router.delete("/listing/:id", isLoggedIn,isOwner, wrapAsync(profileController.profileDestroyListing))                                //PROFILE Delete One Listing Route-------------

router.delete("/all-reviews-delete/:id", isLoggedIn,isReviewAll, wrapAsync(profileController.allReviewDestroy))                                //PROFILE Delete All Listings Route-------------
router.delete("/review/:id/:reviewId", isLoggedIn,isReviewAuthorProfile, wrapAsync(profileController.profileDestroyReview))                                //PROFILE Delete One Listing Route-------------

module.exports = router;        //export---app.js---------------