const mongoose = require('mongoose')

const UserDataSchema = mongoose.Schema({
    Name: {type:String,required: [true, "Please add a Name"]},
    Email: {type:String,unique:[true,"Email is already taken"],required: [true, "Please add a Email"]},
    Password: {type:String,required: [true, "Password can't be Empty"]},
    Favourites: [Number],
    Posts: [Number],
    Username: {type:String,required: [true, "Please add a Username"]},
})

const UserDataModel = mongoose.model("userdata",UserDataSchema)
module.exports = UserDataModel