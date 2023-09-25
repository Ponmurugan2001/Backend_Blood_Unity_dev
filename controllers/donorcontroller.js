const mongoose = require("mongoose");
const donorProfile = require("../models/donarModel");
const User = require("../models/modelUser");

const Appointment = require('../models/appointment');




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
        message: "Error in getting Donar Profile Inventory",
        error,
      });
    }
  };

  exports.getAllDonor = async (req, res) => {
    
    try {
      const Profile = await donorProfile.find({Availability:'Available'}).sort({ createdAt: -1 });
  
      return res.status(200).send({
        success: true,
        messaage: "get all Donor record successfully",
        Profile,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error in retrieving all donor records",
        error: error.message,
      });
    }
  };



// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { recipientId, donorId } = req.body;

    // Find an appointment with the same recipientId and donorId
    const existingAppointment = await Appointment.findOne({ recipientId, donorId });

    if (existingAppointment) {
      // Delete the existing appointment
      await Appointment.findByIdAndDelete(existingAppointment._id);

      // Create a new appointment
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();

      res.status(201).json({ success: true, message: 'Appointment updated successfully', appointment: newAppointment });
    } else {
      // Create a new appointment if no match is found
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).json({ success: true, message: 'Appointment created successfully', appointment });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create/update appointment', message: error.message });
  }
};




exports.getPendingAppointments = async (req, res) => {
  try {
    const donorId = req.params.donorId;
    console.log(donorId);
    const appointment = await Appointment.findOne({ donorId, status: 'pending' });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Pending appointment not found' });
    }

    res.json({ success: true, message: 'Pending appointment found', appointment });
    console.log("hello");
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch pending appointment', message: error.message });
  }
};




// Update the status of an appointment (accept or reject) based on donorId
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { donorId, status } = req.body; // Get donorId and status from the request body

    if (!['accepted', 'rejected','successfull'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const appointment = await Appointment.findOne({ donorId });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = status;
    const updatedAppointment = await appointment.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment', message: error.message });
  }
};
