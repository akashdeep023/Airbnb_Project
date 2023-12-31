const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.profile = async (req, res) => {
	let allListing = await Listing.find({ owner: req.user._id })
		.populate("owner")
		.sort({ _id: -1 });
	let allReview = await Review.find({ author: req.user._id });
	res.render("profiles/profile.ejs", { allListing, allReview });
};

module.exports.allListingDestroy = async (req, res, next) => {
	let { id } = req.params;
	let deleteListing = await Listing.deleteMany({ owner: id });
	req.flash("error", `Listing ${deleteListing.deletedCount} Deleted!`);
	res.redirect("/profile");
};
module.exports.profileDestroyListing = async (req, res, next) => {
	let { id } = req.params;
	let deleteListing = await Listing.findByIdAndDelete(id);
	console.log(deleteListing);
	req.flash("error", "Listing Deleted!");
	console.log("delete");
	res.redirect("/profile");
};

module.exports.allReviewDestroy = async (req, res, next) => {
	let { id } = req.params;
    let allReview = await Review.find({ author: id });
    for (const reviewOne of allReview) {
        await Listing.findByIdAndUpdate(reviewOne.listing,{$pull: {reviews:reviewOne._id}});
        await Review.findByIdAndDelete(reviewOne._id);
    }
	req.flash("error", `Reviews ${allReview.length} Deleted!`);
	res.redirect("/profile");
};

module.exports.profileDestroyReview = async (req, res, next) => {
	let { id, reviewId } = req.params;
	await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	req.flash("error", "Review Deleted!");
	res.redirect("/profile");
};