const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
    email:{
        type: String,
        required: true
    },
    fName:{
        type: String,
        required: true
    },
    lName:{
        type: String,
        // required: true
    },
    image: {
		url: String,
		filename: String,
    },
    // --------google------------
    providerId: String,
    provider: String,
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);