const UserValidationSchema = require("../Validation/UserValidationShema");
const UserDataModel = require("./../Schema/UserDataSchema");
const {sha512} = require("js-sha512")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await UserDataModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Users" });
  }
};
const getOneUser = async (req, res) => {
  try {
    const OneUser = await UserDataModel.find({
      Username: req.params.id,
    }).exec();
    if (OneUser.length === 0) {
      res.status(404).json({ message: "User not Found",OneUser });
    } else {
      res.status(200).json({OneUser,AccessToken:jwt.sign(OneUser.Username,process.env.SECRET)});
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Data" });
  }
};
const createUser = async (req, res) => {
  try {
    const { error, value } = UserValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const Errors = error.details.map((err) => err.message);
      res.status(400).json({ error: Errors });
    }else{
        const { Name, Email, Password, Username } = value;
        const postUser = await UserDataModel.create({
          Name,
          Email,
          Password: sha512(Password),
          Favourites: [],
          Posts: [],
          Username: Username,
        });
        
        res.status(201).json({ message: "User Created", postUser,AccessToken: jwt.sign(Username,process.env.SECRET) });
    }
  } catch (error) {
    errorName = Object.keys(error.keyPattern)
    errorValue = error.keyValue[errorName]
    res.status(500).json({ message: "Unable to Create User",errorMessage: `"${errorValue}" ${errorName[0]} is already taken` });
  }
};
const updateUser = async (req, res) => {
  try {
    // console.log(req.params.id,req.body);
    const patchUser = await UserDataModel.findOneAndUpdate(
      { Username: jwt.sign(req.params.id,process.env.SECRET) },
      { $set: req.body },
      { new: false }
    );
    if (!patchUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      const updatedUser = await UserDataModel.find({ Username: req.params.id });
      res
        .status(200)
        .json({
          message: `User Data Updated for id ${req.params.id}`,
          previousUser: patchUser,
          updatedUser,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Update Data" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserDataModel.findOneAndDelete({
      Username: jwt.sign(req.params.id,process.env.SECRET),
    });
    if (!deleteUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res
        .status(200)
        .json({
          message: `User Data with id ${req.params.id} is deleted`,
          deleteUser,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Delete Data" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
