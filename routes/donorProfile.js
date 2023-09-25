const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {createDonorProfile,getDonorProfile,getAllDonor,createAppointment,getPendingAppointments,updateAppointmentStatus} = require("../controllers/donorcontroller");

const router = express.Router();

//routes
// ADD INVENTORY || POST

router.post("/create-Donor-Profile",authMiddelware,createDonorProfile);
router.get('/get-Donor-Profile/:donorId',authMiddelware, getDonorProfile);
router.get('/get-Donor-All', getAllDonor);
router.post('/donor-appointment',createAppointment)
router.get('/get-pending-appointments/:donorId',getPendingAppointments);
router.post('/update-appointment',updateAppointmentStatus)
module.exports = router;
