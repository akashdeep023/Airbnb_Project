const passport = require("passport");
const User = require("../models/user.js");
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;


var FacebookStrategy = require("passport-facebook").Strategy;
passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			callbackURL: `${FACEBOOK_CALLBACK_URL}`,
			profileFields: ["id", "displayName", "photos", "emails"],
		},
        async function (accessToken, refreshToken, profile, cb) {
            console.log(profile)
            console.log(profile._json)
			let existingUser = await User.findOne({ providerId: profile.id });
			if (existingUser) {
				return cb(null, existingUser);
			} else {
				const newUser = new User({
					providerId: profile.id,
					provider: 'facebook',
					fName: profile._json.name.split(' ')[0],
					lName: profile._json.name.split(' ').slice(1).toString(),
					email: profile._json.email || `facebook${(Math.floor(Math.random() * (501)) + 500)}@example.com`,
					username: profile._json.name.split(' ')[0].toLowerCase()+(Math.floor(Math.random() * (501)) + 500),
					image: {
						// url: profile._json.picture.data.url,
						url: `https://graph.facebook.com/${profile.id}/picture?type=large`,
						filename: `facebook${profile.id}`,
					},
				});
				let facebookUser = await newUser.save();
				return cb(null, facebookUser);
			}
		}
	)
);

module.exports = passport;