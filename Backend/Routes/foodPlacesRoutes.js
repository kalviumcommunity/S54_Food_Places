const express = require("express")
const foodPlacesRoutes = express.Router()
const {getAllPlaces,getOnePlace,createPlace,updatePlace,deletePlace} = require("../Controllers/foodPlacesControllers")

// console.log(getAllPlaces);
foodPlacesRoutes.get("/",getAllPlaces)
foodPlacesRoutes.get("/:id",getOnePlace)
foodPlacesRoutes.post("/",createPlace)
foodPlacesRoutes.patch("/:id",updatePlace)
foodPlacesRoutes.delete("/:id",deletePlace)


module.exports = foodPlacesRoutes