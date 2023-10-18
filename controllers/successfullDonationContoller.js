const SuccessDonation = require('../models/successfullDonation');

exports.getsuccessfullDonationByDonorId = async (req, res) => {
  try {
    const  donorId  = req.params.DonorId;
    
    console.log(donorId)

    const successDonations = await SuccessDonation.find({
      'appointments.donorId': donorId,
    });

    if (!successDonations) {
      return res.status(404).json({ message: 'Appointments not found' });
    }

    const allAppointments = [];

    successDonations.forEach((successDonation) => {
      successDonation.appointments.forEach((appointment) => {
        if (appointment.donorId === donorId) {
          allAppointments.push(appointment);
        }
      });
    });

    res.status(200).json(allAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSuccessfulDonations = async (req, res) => {
    try {
      const successDonations = await SuccessDonation.find();
  
      res.status(200).json(successDonations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  