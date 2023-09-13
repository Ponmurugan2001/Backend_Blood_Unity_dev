const mongoose = require("mongoose");
const recipientProfile= require("../models/recipientModel");
const User = require("../models/modelUser");




exports.createrecipientProfile = async (req, res) => {
    try {
        const newProfileData = req.body;
        
        // Check if a donor profile with the same criteria already exists
        const existingProfile = await recipientProfile.findOne({ recipient: req.body.recipient  });
        
        if (existingProfile) {
            // If a matching record is found, delete the old record
            await recipientProfile.findByIdAndDelete(existingProfile._id);
            console.log("delete")
        }

        // Create the new donor profile
        const newProfile = new recipientProfile(newProfileData);
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

exports.getRecipientProfile = async (req, res) => {
    try {
      console.log("printing userID")
      
      const RecipientId = req.params.recipientId;
      console.log(RecipientId)
      const Profile = await recipientProfile
        .findOne({ recipient : RecipientId})
        
       
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
