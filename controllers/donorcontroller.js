const mongoose = require("mongoose");
const donorProfile = require("../models/donarModel");
const User = require("../models/modelUser");




exports.createDonorProfile = async (req, res) => {
    try {
        const newProfileData = req.body;
        
        // Check if a donor profile with the same criteria already exists
        const existingProfile = await donorProfile.findOne({ donor: req.body.donor  });
        
        if (existingProfile) {
            // If a matching record is found, delete the old record
            await donorProfile.findByIdAndDelete(existingProfile._id);
            console.log("delete")
        }

        // Create the new donor profile
        const newProfile = new donorProfile(newProfileData);
        await newProfile.save();

        return res.status(201).send({
            success: true,
            message: "Profile updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in updating profile",
            error,
        });
    }
};

exports.getDonorProfile = async (req, res) => {
    try {
      console.log("printing userID")
      
      const DonarId = req.params.donorId;
      console.log(DonarId)
      const Profile = await donorProfile
        .findOne({ donor:DonarId })
        
       
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        Profile,
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