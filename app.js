//----------------------------------------------Basic Set up----------------------------------------------
if(process.env.NODE_ENV != "production"){       //this is use only production face not 
    require('dotenv').config();    
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js")              //require Listing model
const path = require("path");                               //
const methodOverride = require("method-override");          //use put, patch, delete route
const ejsMate = require("ejs-mate");                        //layout ejs
// const wrapAsync = require("./utils/wrapAsync.js")           //Error handling
const ExpressError = require("./utils/ExpressError.js")     //Custome error handling

const listingRouter = require("./routers/listing.js")        //resturcturing listing route
const reviewRouter = require("./routers/review.js")          //resturcturing revies route
const userRouter = require("./routers/user.js")          //resturcturing revies route

const session = require("express-session");             //require express-session to help storege data on temprory
const MongoStore = require("connect-mongo")     //---  use to session store
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
const DB_URL = process.env.ATLASDB_URL;//---
main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch(err => console.log(err));

async function main() {
    //   await mongoose.connect(MONGO_URL);
      await mongoose.connect(DB_URL);//---
}

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public/")));

const store = MongoStore.create({//---
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE")
})

const sessionOptions = {
    store, //---
    secret: process.env.SECRET,//---
    resave: false,
    saveUninitialized: true,
    cookie:{                                            //set custome cookie
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  //add expiry date
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions))  
app.use(flash());

//Authentication and Authorization----------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));   // use static authenticate method of model in LocalStrategy----

passport.serializeUser(User.serializeUser());           // use static serialize and deserialize of model for passport session support----
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success")   //success send to flash.ejs
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})
app.use("/",userRouter);
app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

//error handling midlleware---------
app.use((err,req,res,next)=>{
    // res.send("something went wrong");
    let {statusCode =500 , message = "Something went wrong!"} = err;
    res.status(statusCode).render("listings/error.ejs",{message})

});