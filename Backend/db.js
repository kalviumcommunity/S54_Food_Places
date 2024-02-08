const mongoose = require("mongoose")
require("dotenv").config()
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.URL)
        // console.log(process.env.URL);
    } catch (error) {
        console.log(error);
    }
    return mongoose.connection.readyState === 1
}

module.exports = {connect}