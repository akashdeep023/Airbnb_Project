//Validation for Schema (Hoppscotch)------------------------------------------
//joi packages------------------------
//The most powerful schema description language and data validator for JavaScript.
//https://joi.dev/api/?v=17.9.1
//install -> npm i joi
const Joi = require ("joi");

//listings validation-------
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
    }).required()//---------.required()     delete kiye to work kiya par 
})
//reviews validation-------
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        // createAt: Joi.date().allow("",null),
    }).required()
})







