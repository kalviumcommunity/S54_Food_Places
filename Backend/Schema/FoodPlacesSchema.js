const mongoose = require('mongoose')
const FoodPlacesSchema = mongoose.Schema({
    ListingId : {type:Number,required: [true, "Please add Listing Id"]},
    Name : {type:String,required: [true, "Please add a Name"]},
    Image : String,
    Rating: Number,
    Location: {type:String,required: [true, "Please add a Location"]},
    SpendPerPerson: String,
    Cuisines: String,
    OpenHours: String,
    PhoneNumber: String,
    Website : String,
    Email: String,
    PostedBy: {type:String,required: [true, "Please add a UserName"]}
},
{
    timestamps: true
}
)
const FoodPlacesModel = mongoose.model("foodplacesdata", FoodPlacesSchema)

module.exports = FoodPlacesModel

