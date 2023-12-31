const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const User = require("../models/modelUser");

const InventoryProfile = require('../models/InventoryProfileModel')


// CREATE INVENTOR
exports.createInventoryController = async (req, res) => {
  try {
    // const { email } = req.body;
    // //validation
    // // const user = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
    // const user = await User.findOne({ email });
  
    // console.log(user)
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `User with email '${email}' not found.`,
    //   });
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      console.log("org id"+organisation)
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      //console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      // req.body.hospital = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create Inventory API",
      error,
    });
  }
};
// GET ALL BLOOD RECORS
exports.getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

exports.getAllInventory = async (req, res) => {
  console.log("inside all invent")
  try {
    const inventory = await inventoryModel.find().sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Retrieved all inventory records successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in retrieving all inventory records",
      error: error.message,
    });
  }
};

// Create an Inventory Profile
exports.createInventoryProfile = async (req, res) => {
  try {
    const {
      OrganisationName,
      phoneNumber,
      email,
      Address,
      location,
      OrganisationId,
    } = req.body;

    // Check if a profile with the same OrganisationId already exists
    const existingProfile = await InventoryProfile.findOne({ OrganisationId });

    if (existingProfile) {
      // If a profile with the same OrganisationId exists, delete it
      await InventoryProfile.findByIdAndDelete(existingProfile._id);
    }

    const profile = new InventoryProfile({
      OrganisationName,
      phoneNumber,
      email,
      Address,
      location,
      OrganisationId,
    });

    const savedProfile = await profile.save();

    res.status(201).json({ success: true, data: savedProfile });
    
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error", errorMessage: error.message });
  }
};


// Get an Inventory Profile by ID


// Get Inventory Profiles by OrganisationId
exports.getInventoryProfilesByOrganisationId = async (req, res) => {
  try {
    const profiles = await InventoryProfile.find({
      OrganisationId: req.params.organisationId,
    });

    if (!profiles) {
      return res.status(404).json({ error: 'Profiles not found' });
    }

    res.status(200).json({success:true, profiles});
  } catch (error) {
    res.status(500).json({success:false, error: 'Internal server error' });
  }
};
