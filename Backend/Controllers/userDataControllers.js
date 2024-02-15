const UserDataModel = require("./../Schema/UserDataSchema")

const getAllUsers = async (req, res) => {
    try {
        const AllUsers = await UserDataModel.find({})
        res.status(200).json(AllUsers)
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch Users" })
    }
}
const getOneUser = async (req, res) => {
    try {
        const OneUser = await UserDataModel.find({Username: req.params.id}).exec()
        if (OneUser.length == 0) {
            res.status(404).json({ message: "User not Found" })
        } else {
            res.status(200).json(OneUser)
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch Data" })
    }
}
const createUser = async (req, res) => {
    try {
        const body = req.body
        const count = await UserDataModel.countDocuments({}).exec()
        const {Name,Email,Password,Username} = body
        if(!Name || !Email || !Password || !Username){
            res.status(404).json({message: "Mandatory Fields are Empty"})
        }
        const postUser  = await UserDataModel.create({
            Name,Email,Password,Favourites:[],Posts:[],Username
        })
        res.status(201).json({message: "Place Created",postUser})
    } catch (error) {
        res.status(500).json({message: "Unable to Post Place"})
    }
}
const updateUser = async(req, res) => {
    try {
        // console.log(req.params.id,req.body);
        const patchUser = await UserDataModel.findOneAndUpdate({Username: req.params.id},{$set:req.body},{new: false})
        if(!patchUser){
            res.status(404).json({ message: "User not Found" })
        }else{
            const updatedUser = await UserDataModel.find({Username:req.params.id})
            res.status(200).json({message: `User Data Updated for id ${req.params.id}`,previousUser:patchUser,updatedUser})
        }
    } catch (error) {
        res.status(500).json({message:"Unable to Update Data"})
    }
}
const deleteUser = async(req, res) => {
    try {
        const deleteUser = await UserDataModel.findOneAndDelete({Username: req.params.id})
        if(!deleteUser){
            res.status(404).json({ message: "User not Found" })
        }else{
            res.status(200).json({message: `User Data with id ${req.params.id} is deleted`,deleteUser})
        }
        
    } catch (error) {
        res.status(500).json({message:"Unable to Delete Data"})
    }
}

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser }