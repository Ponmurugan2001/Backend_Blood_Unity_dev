const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {createrecipientProfile,getRecipientProfile} = require("../controllers/recipientcontroller");

const router = express.Router();

//routes
// ADD INVENTORY || POST
http://localhost:9000/api/v1/inventory/create-inventory
router.post("/create-Recipient-Profile",authMiddelware,createrecipientProfile);
router.get('/get-recipient-Profile/:recipientId',authMiddelware, getRecipientProfile);


module.exports = router;
