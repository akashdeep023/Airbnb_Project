if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");
const profileRouter = require("./routers/profile.js");
const googleRoute = require("./routers/google.js");
const facebookRoute = require("./routers/facebook.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
const DB_URL = process.env.ATLASDB_URL;
main()
	.then(() => {
		console.log("connected to DB");
	})
	.catch((err) => console.log(err));

async function main() {
	//   await mongoose.connect(MONGO_URL);
	await mongoose.connect(DB_URL);
}

app.listen(8080, () => {
	console.log("server is listening to port 8080");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public/")));

const store = MongoStore.create({
	mongoUrl: DB_URL,
	crypto: {
		secret: process.env.SECRET,
	},
	touchAfter: 24 * 3600,
});
store.on("error", () => {
	console.log("ERROR in MONGO SESSION STORE");
});

const sessionOptions = {
	store,
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	},
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.currUser = req.user;
	console.log("<<========================START========================>>");
	console.log(`rawheaders:- ${req.get("rawHeaders")}`);
	console.log(`rawheaders:- ${req.rawHeaders.slice(";").join("     ")}`);
	console.log(`Country name:- ${req.get("cf-ipcountry")}`);
	console.log(`Referar name:- ${req.get("referer")}`);
	console.log(`Use site name:- ${req.get("sec-ch-ua")}`);
	console.log(`Mobile name:- ${req.get("sec-ch-ua-mobile")}`);
	console.log(`Platform name:- ${req.get("sec-ch-ua-platform")}`);
	console.log(`Client IP address is:- ${req.get("true-client-ip")}`);
	console.log(`Connecting IP address is:- ${req.get("cf-connecting-ip")}`);
	console.log(`Forwarded IP address is:- ${req.get("x-forwarded-for")}`);
	console.log(`User detail:- ${res.locals.currUser}`);
	console.log("<<========================END========================>>");
	next();
});

app.use("/auth/google", googleRoute);
app.use("/auth/facebook", facebookRoute);
app.use("/", userRouter);
app.use("/profile", profileRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something went wrong!" } = err;
	res.status(statusCode).render("listings/error.ejs", { message });
});
