const Joi = require('joi')

const FoodPlaceValidationSchema = Joi.object({
    Name: Joi.string().required().min(4),
    Image: Joi.string().required(),
    Rating: Joi.string(),
    Location: Joi.string().required(),
    SpendPerPerson: Joi.string().required(),
    Cuisines: Joi.string(),
    OpenHours: Joi.string(),
    PhoneNumber: Joi.string().required(),
    Website: Joi.string(),
    Email: Joi.string(),
    PostedBy: Joi.string().required()
})

module.exports = FoodPlaceValidationSchema