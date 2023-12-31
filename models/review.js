const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // add listing id
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }
});

module.exports = mongoose.model("Review",reviewSchema)