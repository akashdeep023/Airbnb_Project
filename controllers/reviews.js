const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res, next) => {
	let listing = await Listing.findById(req.params.id);
	let newReview = new Review(req.body.review);
	newReview.author = req.user._id;
	newReview.listing = listing._id;//add listing id in review
	listing.reviews.push(newReview);
	await newReview.save();
	await listing.save();
	console.log("new review saved");
	req.flash("success", "New Review Created!");
	res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res, next) => {
	let { id, reviewId } = req.params;
	await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });//pull -> remove (review delete by id in listing)
	await Review.findByIdAndDelete(reviewId);
	req.flash("error", "Review Deleted!");
	res.redirect(`/listings/${id}`);
};
