const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});


module.exports.index = async(req,res,next)=>{
    let allListing = await Listing.find();
   res.render("listings/index.ejs",{allListing});    
}

module.exports.renderNewForm = (req,res)=>{
        res.render("listings/new.ejs");
}

module.exports.createListing =  async(req,res,next)=>{  
    let response = await geocodingClient.forwardGeocode({
        query: `${req.body.listing.location},${req.body.listing.country}`,
        limit: 1
    }).send()
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);          
    newListing.owner = req.user._id;
    newListing.image = {url,filename};                          
    newListing.geometry = response.body.features[0].geometry;   
    await newListing.save();
    req.flash("success","New Listing Created!")
    res.redirect("/listings");
}

module.exports.showListing = async(req,res,next)=>{
    let {id} = req.params;                     
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path: "author"}}).populate("owner");
    
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}

module.exports.renderEditForm = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/w_200,h_150")
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing , originalImage});
}

module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params;
    let response = await geocodingClient.forwardGeocode({
        query: `${req.body.listing.location},${req.body.listing.country}`,
        limit: 1
    }).send()
    let updateListing = req.body.listing;  
    let listing = await Listing.findByIdAndUpdate(id,updateListing);

    listing.geometry = response.body.features[0].geometry;  
    await listing.save();

    if(typeof req.file != "undefined"){    
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async(req,res,next)=>{
    let {id} = req.params;
    let deleteListing =await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("error","Listing Deleted!")
    console.log("delete")
    res.redirect("/listings");
}