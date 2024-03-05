const Joi = require('joi')

const FoodPlaceValidationSchema = Joi.object({
    Name: Joi.string().required().min(4),
    Image: Joi.string().required(),
    Rating: Joi.string(),
    Location: Joi.string().required(),
    SpendPerPerson: Joi.string().required(),
    Cuisines: Joi.string().allow(''),
    OpenHours: Joi.string().allow(''),
    PhoneNumber: Joi.string().required(),
    Website: Joi.string().allow(''),
    Email: Joi.string().allow(''),
    PostedBy: Joi.string().required()
})

module.exports = FoodPlaceValidationSchema