const passport = require("passport");
const User = require("../models/user.js");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${GOOGLE_CALLBACK_URL}`,
		},
		async function (accessToken, refreshToken, profile, cb) {
			let existingUser = await User.findOne({ providerId: profile.id });
			if (existingUser) {
				return cb(null, existingUser);
			} else {
				const newUser = new User({
					providerId: profile.id,
					provider: 'google',
					fName: profile._json.given_name,
					lName: profile._json.family_name,
					email: profile._json.email || `google${(Math.floor(Math.random() * (501)) + 500)}@example.com`,
					username: profile._json.given_name.toLowerCase()+(Math.floor(Math.random() * (1000 - 500 + 1)) + 500),
					image: {
						url: profile._json.picture.replace("=s96-c", "=s400-c"),
						filename: `google${profile.id}`,
					},
				});
				let googleUser = await newUser.save();
				console.log(googleUser);
				return cb(null, googleUser);
			}
		}
	)
);

module.exports = passport;
