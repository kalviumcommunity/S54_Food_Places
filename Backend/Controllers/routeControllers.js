const getAllPlaces =(req,res)=>{
    res.status(200).json({
        message:"Get All Places"
    })
}
const getOnePlace =(req,res)=>{
    res.status(200).json({
        message: `Get One Place with id ${req.params.id}`,
    })
}
const createPlace =(req,res)=>{
    res.status(201).json({
        message: 'Place created',
        body: req.body
    })
}
const updatePlace=(req,res)=>{
    res.status(201).json({
        message: `Place updated for place with id ${req.params.id}`
    })
}
const deletePlace=(req,res)=>{
    res.status(200).json({
        message: `Delete Place with id ${req.params.id}`
    })
}

module.exports = {getAllPlaces,getOnePlace,createPlace,updatePlace,deletePlace}
