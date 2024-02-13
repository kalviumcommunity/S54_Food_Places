const mongoose = require("mongoose")
require("dotenv").config()
const connect = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.URL)
        console.log("Database Connected",)
        return "Database Connected"
    } catch (error) {
        console.log("Unable to connect because of", error.message);
        return `Unable to connect because of, ${error.message}`
        process.exit(1)
    }
}

module.exports = {connect}