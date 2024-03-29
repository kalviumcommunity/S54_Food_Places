const FoodPlacesModel = require("../Schema/FoodPlacesSchema");
const FoodPlaceValidationSchema = require("../Validation/FoodPlaceValidation");

const getAllPlaces = async (req, res) => {
  try {
    const AllPlaces = await FoodPlacesModel.find({});
    res.status(200).json(AllPlaces);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Food Places" });
  }
};
const getOnePlace = async (req, res) => {
  try {
    const OnePlace = await FoodPlacesModel.findById(req.params.id);
    if (!OnePlace) {
      res.status(404).json({ message: "Place not Found" });
    } else {
      res.status(200).json(OnePlace);
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Food Place" });
  }
};
const createPlace = async (req, res) => {
  try {
    // const body = req.body;
    const { error, value } = FoodPlaceValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log("error: ", error);
      const Errors = error.details.map(err=>err.message)
      res.status(400).json({ error: Errors });
    }else{
      console.log("value: ",value);
      const count = await FoodPlacesModel.countDocuments({}).exec();
      const {
        Name,
        Image,
        Rating,
        Location,
        SpendPerPerson,
        Cuisines,
        OpenHours,
        PhoneNumber,
        Website,
        Email,
        PostedBy,
      } = value;
      const postPlace = await FoodPlacesModel.create({
        ListingId: count + 1,
        Name,
        Image,
        Rating: !Rating ? 3 : Rating,
        Location,
        SpendPerPerson,
        Cuisines: !Cuisines ? "NA" : Cuisines,
        OpenHours: !OpenHours ? "NA" : OpenHours,
        PhoneNumber: `+91 ${PhoneNumber}`,
        Website: !Website ? "NA" : Website,
        Email: !Email ? "NA" : Email,
        PostedBy,
      });
      res.status(201).json({ message: "Place Created", postPlace });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Post Place",error });
  }
};
const updatePlace = async (req, res) => {
  try {
    // console.log(req.params.id,req.body);
    const patchPlace = await FoodPlacesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: false }
    );
    if (!patchPlace) {
      res.status(404).json({ message: "Place not Found" });
    } else {
      const updatedPlace = await FoodPlacesModel.findById(req.params.id);
      res
        .status(200)
        .json({
          message: `Place Updated for id ${req.params.id}`,
          previousPlace: patchPlace,
          updatedPlace,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Update Place" });
  }
};
const deletePlace = async (req, res) => {
  try {
    const deletePlace = await FoodPlacesModel.findByIdAndDelete(req.params.id);
    if (!deletePlace) {
      res.status(404).json({ message: "Place not Found" });
    } else {
      res
        .status(200)
        .json({
          message: `Place named ${deletePlace.Name} is deleted`,
          deletePlace,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Delete Place" });
  }
};

module.exports = {
  getAllPlaces,
  getOnePlace,
  createPlace,
  updatePlace,
  deletePlace,
};
