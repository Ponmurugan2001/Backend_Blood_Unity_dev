const mongoose = require("mongoose");
const donorProfile = require("../models/donarModel");
const User = require("../models/modelUser");
const SuccessDonation =require('../models/successfullDonation')
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
    }

    // Create a new appointment
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    // Update the donor's availability to 'NotAvailable'
    
    // Check if a donor profile with the same donorId already exists
    const existingProfile = await donorProfile.findOne({ donor: donorId });

    if (existingProfile) {
      // If a matching record is found, update the availability to "NotAvailable"
      existingProfile.Availability = "NotAvailable";
      await existingProfile.save();
      console.log("Donor availability updated to NotAvailable");
    } 
    return res.status(201).send({
      success: true,
      message: "Appointment created and donor profile updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating appointment and updating donor profile",
      error,
    });
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
    const { donorId, status } = req.body;

    if (!['pending', 'accepted', 'rejected', 'successfull'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const appointment = await Appointment.findOne({ donorId });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    if (status === 'accepted') {
      // Update donor availability to "NotAvailable"
      await updateDonorAvailability(donorId, 'NotAvailable');
    } else if (status === 'rejected' || status === 'successfull') {
      // Update donor availability to "Available"
      await updateDonorAvailability(donorId, 'Available');
    }

    if (status === 'successfull') {
      // Create a new SuccessDonation record
      const newAppointment = new SuccessDonation({
        appointments: [appointment],
      });

      const savedAppointment = await newAppointment.save();
      console.log("Appointment added to the SuccessDonation record:", savedAppointment);

      // Delete the appointment from the Appointment collection
      const deletedAppointment = await Appointment.findOneAndRemove({ donorId });
      if (!deletedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      return res.json({ success: true, message: 'Appointment deleted successfully' });
    }

    // Send a success response for other status values
    res.json({ success: true, message: 'Appointment status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

async function updateDonorAvailability(donorId, availability) {
  try {
    const existingProfile = await donorProfile.findOne({ donor: donorId });
    if (existingProfile) {
      existingProfile.Availability = availability;
      await existingProfile.save();
      console.log(`Donor availability updated to ${availability}`);
    }
  } catch (error) {
    console.error(`Failed to update Donor availability to ${availability}`, error);
    throw error;
  }
}



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

