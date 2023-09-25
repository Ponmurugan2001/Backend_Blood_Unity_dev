const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {createrecipientProfile,getRecipientProfile,getrecipientAppointments} = require("../controllers/recipientcontroller");

const router = express.Router();

//routes
// ADD INVENTORY || POST
router.post("/create-Recipient-Profile",authMiddelware,createrecipientProfile);
router.get('/get-recipient-Profile/:recipientId',authMiddelware, getRecipientProfile);
router.get('/get-recipient-appointments/:recipientId',getrecipientAppointments);

module.exports = router;
