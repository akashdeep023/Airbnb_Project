const express = require("express");
const router = express.Router({mergeParams: true});    //use parent parameter (by default: false)

const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//------------------------------------------------Create Reviews Route--------------------------------------------
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//------------------------------------------------Delete Reviews Route--------------------------------------------
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

//export---------------- app.js---------------
module.exports = router;